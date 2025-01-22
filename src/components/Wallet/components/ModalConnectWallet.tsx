import ModalAntCustome from "@/components/ModalAntCustome";
import { actionSelector, hideModalConnectWallet, showModalSignMessage } from "@/redux/slices/action.slice";
import { isMobile } from "@/utils/common";
import { checkOkxWallet, filterWallet, moveOkxWalletTFirst } from "@/utils/filter-wallet";
import { Button, Spin, Tabs, TabsProps, Typography, notification } from "antd";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { BaseError } from "viem";
import { Connector, useAccount, useConnect } from "wagmi";

const WrapTabs = styled(Tabs)`
	.ant-tabs-tab-btn {
	}
	.ant-tabs-tab.ant-tabs-tab-active {
		.ant-tabs-tab-btn {
		}
	}
`;

const HeaderTab = ({ title }: { title: string }) => (
	<p className="text-xl font-bold py-2 my-2 text-light text-left text-green-300">{title}</p>
);

const ModalConnectWallet: React.FunctionComponent = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { isConnected, connector: currentConnector, chainId } = useAccount();
	const { isVisibleModalConnectWallet } = useSelector(actionSelector);

	const {
		connect,
		connectors,
		error,
		isPending: isLoading,
	} = useConnect({
		mutation: {
			onError(error: any, variables: any, context: any) {
				console.log(error);
				const err = error && (error as BaseError).shortMessage;
				notification.error({
					message: t("cmp_mc_1", {
						defaultValue: "Connect wallet error",
					}),
					description: err,
				});
				// show error
			},
			onSuccess(data: any, variables: any, context: any) {
				// if (!isInListChain(data.chain.id)) {
				// 	dispatch(showModalSwitchNetwork());
				// } else {
				// 	dispatch(showModalSignMessage());
				// }
				dispatch(showModalSignMessage());

				handleCloseModalWallet();
			},
		},
	});

	const handleCloseModalWallet = () => {
		dispatch(hideModalConnectWallet());
	};

	const handleConnectWallet = async (connector: Connector) => {
		//kai: 30.07.2024
		//ensure connect correct current connector
		if (isConnected && currentConnector && currentConnector.id === connector.id) {
			handleCloseModalWallet();
			dispatch(showModalSignMessage());

			return;
		}
		//if choose other connector. disconnect current connector
		if (isConnected && currentConnector && currentConnector.id !== connector.id) {
			await currentConnector.disconnect();
		}
		if (connector.name.includes("WalletConnect")) {
			handleCloseModalWallet();
		}
		connect({ connector: connector });
	};

	const connectorInfo = {
		MetaMask: {
			img: "/images/connect-wallet/metamask.png",
			name: "MetaMask",
		},
		WalletConnect: {
			img: "/images/connect-wallet/wallet-connect.png",
			name: "WalletConnect 2.0",
		},
		Injected: {
			img: "/images/connect-wallet/injected.png",
			name: "Injected",
		},
		WalletConnectLegacy: {
			img: "/images/connect-wallet/wallet-connect.png",
			name: "WalletConnect 1.0",
		},
		Okx: {
			img: "/images/connect-wallet/okx.jpeg",
			name: "OKX Wallet",
		},
	};

	const otherTab = useMemo(() => {
		return (
			<div className="my-2">
				<ul className="flex flex-col gap-3">
					{(isMobile ? moveOkxWalletTFirst(connectors as any) : filterWallet(connectors)).map((connector) => {
						const connectorName: any = connector?.name;
						const img = (connectorInfo as any)[connectorName]?.img
							? (connectorInfo as any)[connectorName]?.img
							: connector.icon;
						let name = connectorName;

						// if (name === connectorInfo.MetaMask.name || connector.ready) {
						// name = !connector.ready ? "Install " + name : name;
						return (
							<li
								key={connector.id}
								className="flex flex-row items-center justify-between shadow bg-dark-500/80 rounded-xl border-none h-full hover:(border-base bg-[#fff3] cursor-pointer) border px-3 py-2 text-gray-300 text-sm"
								onClick={() => handleConnectWallet(connector)}
							>
								{name}
								<img
									width={32}
									height={32}
									src={img}
									alt="Metamask"
									className="h-8 w-8"
								/>
							</li>
						);
						// }
					})}
				</ul>
			</div>
		);
	}, [connectors, connectorInfo]);

	const okxConnector = checkOkxWallet(connectors);

	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "OKX Wallet",
			children: (
				<div className="my-2">
					<ul className="flex flex-col gap-3">
						{okxConnector ? (
							<li
								key={okxConnector?.id}
								className="flex flex-row items-center justify-between  shadow bg-dark-500/80 rounded-xl border-none h-full hover:(border-base bg-[#fff3] cursor-pointer) border px-3 py-2 text-gray-300 text-sm"
								onClick={() => handleConnectWallet(okxConnector)}
							>
								{connectorInfo.Okx.name}
								<img
									width={32}
									height={32}
									src={connectorInfo.Okx.img}
									alt="okx"
									className="h-8 w-8"
								/>
							</li>
						) : (
							<li
								className="flex flex-row items-center justify-between  shadow bg-dark-500/80 rounded-xl border-none h-full hover:(border-base bg-[#fff3] cursor-pointer) border px-3 py-2 text-gray-300 text-sm"
								onClick={() => {
									window.open(
										"https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge",
									);
								}}
							>
								{t("cmp_mcw_2", {
									defaultValue: "Add Okx wallet extension to Chrome",
								})}
								<img
									width={32}
									height={32}
									src={"/images/connect-wallet/okx.jpeg"}
									alt="Metamask"
									className="h-8 w-8 rounded-md"
								/>
							</li>
						)}
					</ul>
				</div>
			),
		},
		{
			key: "2",
			label: t("cmp_mcw_3", {
				defaultValue: "Other",
			}),
			children: otherTab,
		},
	];

	const renderHeader = () => (
		<div>
			<div className="flex justify-between items-center">
				<Typography.Title
					level={3}
					className="!text-base-light font-extrabold tracking-wider"
				>
					{t("cmp_mcw_Connect_Wallet", {
						defaultValue: "Connect Wallet",
					})}
				</Typography.Title>
			</div>
			<Typography.Paragraph className="font-normal text-sm">
				{t("cmp_mcw_alert", {
					defaultValue: "Please connect your wallet to continue. The system supports the following wallets.",
				})}
			</Typography.Paragraph>
		</div>
	);

	const renderConnectTon = () => {
		return (
			<div className="mt-5 rounded-lg">
				<HeaderTab title="Ton Network" />
				<li
					className="flex flex-row items-center justify-between shadow bg-dark-500/80 rounded-xl border-none h-full hover:(border-base bg-[#fff3] cursor-pointer) border px-3 py-2 text-gray-300 text-sm"
					onClick={() => {
						dispatch(hideModalConnectWallet());
					}}
				>
					{t("cmp_mcw_4", {
						defaultValue: "Ton - The Open Network",
					})}
					<img
						width={32}
						height={32}
						src={"/images/currency.png"}
						alt="Metamask"
						className="h-8 w-8 rounded-md"
					/>
				</li>
			</div>
		);
	};

	const renderEvmNetwork = () => {
		return (
			<div className="mt-5 py-2">
				<HeaderTab title="EVM Network" />
				{isMobile ? (
					otherTab
				) : (
					<WrapTabs
						defaultActiveKey="1"
						items={items}
						onChange={onChange}
					/>
				)}
			</div>
		);
	};
	const onChange = (key: string) => {};

	return (
		<ModalAntCustome
			open={isVisibleModalConnectWallet}
			footer={null}
			width={417}
			onCancel={handleCloseModalWallet}
		>
			<Spin
				spinning={isLoading}
				tip={t("cmp_mcw_cw_tips", {
					defaultValue: "Connecting...",
				})}
			>
				<div className="p-6  shadow">
					{renderHeader()}
					{renderConnectTon()}
					{renderEvmNetwork()}
					<div className="modal-footer">
						<Button
							className="mt-5"
							type="default"
							onClick={handleCloseModalWallet}
							block
							size="large"
						>
							{t("cmp_mcw_Cancel", {
								defaultValue: "Cancel",
							})}{" "}
						</Button>
					</div>
				</div>
			</Spin>
		</ModalAntCustome>
	);
};

export default ModalConnectWallet;
