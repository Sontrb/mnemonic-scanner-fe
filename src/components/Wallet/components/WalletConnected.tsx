"use client";
import useLogout from "@/hooks/useLogout";
import { authSelector, useIsLogin } from "@/redux/slices/auth.slice";
import { ellipsisAddress, isMobile } from "@/utils/common";
import { WalletFilled, WalletOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAccount, useDisconnect } from "wagmi";
import { Trans, useTranslation } from "react-i18next";
const WalletConnected: React.FunctionComponent = () => {
	const { t } = useTranslation();
	const isLogin = useIsLogin();
	const { walletID } = useSelector(authSelector);
	const { logoutAndClearAll } = useLogout();
	const { isConnected, address, connector, chain } = useAccount();
	const { disconnect } = useDisconnect();

	const handleLogout = () => {
		logoutAndClearAll();
	};

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<span>
					{t("cmp_wct", {
						defaultValue: "Logout",
					})}
				</span>
			),
			onClick: handleLogout,
		},
	];

	useEffect(() => {
		if (isConnected && address && connector) {
			if (chain) {
				if (walletID) {
					//if change account or change network do disconnect
					if (walletID !== address) {
						if (!isMobile) {
							disconnect();
							handleLogout();
						}
					}
				} else {
					// authen();
				}
			}
		}
	}, [address, isConnected, connector, chain, walletID]);

	return isLogin && address ? (
		<Dropdown
			menu={{ items }}
			placement="bottomRight"
		>
			<Button
				className="gradient-border flex items-center !bg-base/10"
				size="large"
				type="primary"
				
			>
				 <WalletFilled />{ellipsisAddress(walletID as string, 5)}
			</Button>
		</Dropdown>
	) : null;
};

export default WalletConnected;
