"use client";
import ModalAntCustome from "@/components/ModalAntCustome";
import { listChain } from "@/configs/app";
import useLogout from "@/hooks/useLogout";
import {
	actionSelector,
	hideModalSwitchNetwork,
	showModalSignMessage,
	useChainIdSelector,
} from "@/redux/slices/action.slice";
import { updateSelectedChain } from "@/redux/slices/system.slice";
import { Button, notification, Typography } from "antd";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChainId, useSwitchChain, useAccount } from "wagmi";
import { Trans, useTranslation } from "react-i18next";

const ModalSwitchNetwork: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const [selectedChain, setSelectedChain] = useState<number | null>();
	const { isVisibleModalSwitchNetwork } = useSelector(actionSelector);
	const { chainId, connector } = useAccount();
	const { logoutAndClearAll } = useLogout();
	const { t } = useTranslation();
	const {
		isPending: isLoading,
		switchChainAsync,
		chains,
	} = useSwitchChain({
		mutation: {
			onError(error, variables, context) {
				notification.error({
					message: t("cmp_mwn_err_1", {
						defaultValue: "Switch Network error",
					}),
					description: error.message,
				});
			},
			onSuccess: (data) => {
				// if (!isInListChain(data?.id)) {
				// dispatch(logout());
				// logoutAndClearAll();
				// }
			},
		},
	});

	const handleCloseModalSwitchNetwork = useCallback(() => {
		dispatch(hideModalSwitchNetwork());
	}, [chainId]);

	const handleSwitchNetwork = async (_chain: any) => {
		try {
			setSelectedChain(_chain.chainId);
			dispatch(updateSelectedChain(_chain.chainId));
			if (chainId === _chain.chainId) {
				handleCloseModalSwitchNetwork();
				return;
			}
			switchChainAsync && (await switchChainAsync({ chainId: _chain.chainId, connector: connector }));
			setTimeout(() => {
				handleCloseModalSwitchNetwork();
			}, 300);
			dispatch(showModalSignMessage());
		} catch (error) {
			console.log(error);
		}
	};

	const chainIdSupportFunction = useChainIdSelector();
	const listChainId = chainIdSupportFunction
		? listChain.filter((item) => item.chainId === chainIdSupportFunction)
		: listChain;

	return (
		<ModalAntCustome
			open={isVisibleModalSwitchNetwork}
			className="rounded-xl"
			width={417}
			footer={null}
		>
			<div className="p-6   shadow">
				<div>
					<div className="flex justify-center items-center">
						<Typography.Title
							level={3}
							className="!text-base-light font-extrabold tracking-wider"
						>
							{t("cmp_msw_tit", {
								defaultValue: "Switch networks",
							})}
						</Typography.Title>
					</div>
					<p className="font-normal text-sm text-txt-primary text-center">
						{t("cmp_msw_des", {
							defaultValue:
								"This app does not support the current connected network. Switch or disconnect to continue.",
						})}
					</p>
				</div>
				<div className="py-5">
					<ul className="flex flex-col gap-3">
						{listChainId.map((_chain) => {
							const loading = isLoading && selectedChain === _chain.chainId && chainId !== selectedChain;
							return (
								<li
									key={_chain.chainId}
									className="flex flex-row items-center justify-between   bg-[#212121] border border-[#ffffff20] h-full hover:(border-base bg-[#fff3] cursor-pointer) border px-3 py-2 text-gray-300 text-sm "
									onClick={() => handleSwitchNetwork(_chain)}
								>
									<span className="flex items-center">
										<Image
											src={_chain.icon}
											alt="Metamask"
											width={32}
											height={32}
											className="mr-[14px]"
										/>
										<span>{_chain.name}</span>
									</span>
									<span className="flex">
										{chainId == _chain.chainId && (
											<span className="load-img-chain text-green">
												{t("cmp_swn_Connected", {
													defaultValue: "Connected",
												})}
											</span>
										)}
										{loading && chainId != _chain.chainId && (
											<span>
												<Image
													width={32}
													height={32}
													className="animation-1"
													src="/images/connect-wallet/loading.svg"
													alt="Metamask"
												/>
											</span>
										)}
									</span>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="modal-footer">
					<Button
						block
						className="h-10 mt-5 flex items-center justify-center"
						type="default"
						onClick={handleCloseModalSwitchNetwork}
						icon={
							<svg
								width="25"
								height="24"
								viewBox="0 0 25 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19.6893 12L16.2825 15.4069C16.1418 15.5475 16.0625 15.7386 16.0625 15.9375C16.0625 15.9495 16.0628 15.9615 16.0634 15.9735C16.0723 16.1598 16.1503 16.336 16.2822 16.4678C16.4228 16.6085 16.6136 16.6875 16.8125 16.6875C17.0114 16.6875 17.2022 16.6085 17.3428 16.4678L21.2803 12.5303C21.421 12.3897 21.5 12.1989 21.5 12C21.5 11.8011 21.421 11.6103 21.2803 11.4697L17.3429 7.53226C17.2022 7.39152 17.0114 7.3125 16.8125 7.3125C16.6136 7.3125 16.4228 7.39152 16.2822 7.53217C16.1415 7.67282 16.0625 7.86359 16.0625 8.0625C16.0625 8.26141 16.1415 8.45218 16.2822 8.59283L19.6893 12Z"
									fill="white"
								/>
								<path
									d="M10.25 12.75H20.75C21.1642 12.75 21.5 12.4142 21.5 12C21.5 11.5858 21.1642 11.25 20.75 11.25H10.25C9.83579 11.25 9.5 11.5858 9.5 12C9.5 12.4142 9.83579 12.75 10.25 12.75Z"
									fill="white"
								/>
								<path
									d="M5 4.5H10.25C10.6642 4.5 11 4.16421 11 3.75C11 3.33579 10.6642 3 10.25 3H5C4.37868 3 3.93934 3.43934 3.93934 3.43934C3.5 3.87868 3.5 4.5 3.5 4.5V19.5C3.5 20.1213 3.93934 20.5607 3.93934 20.5607C4.37868 21 5 21 5 21H10.25C10.6642 21 11 20.6642 11 20.25C11 19.8358 10.6642 19.5 10.25 19.5H5V4.5Z"
									fill="white"
								/>
							</svg>
						}
					>
						{t("cmp_msw_Disconnect", {
							defaultValue: "Disconnect",
						})}
					</Button>
				</div>
			</div>
		</ModalAntCustome>
	);
};

export default ModalSwitchNetwork;
