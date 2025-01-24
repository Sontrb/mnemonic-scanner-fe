"use client";
import useLogout from "@/hooks/useLogout";
import { ellipsisAddress } from "@/utils/common";
import { Button, Dropdown, MenuProps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAccount } from "wagmi";

const WalletConnected: React.FunctionComponent = () => {
	const { t } = useTranslation();
	const { logoutAndClearAll } = useLogout();
	const { isConnected, address, connector, chain } = useAccount();

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

	// useEffect(() => {
	// 	if (isConnected && address && connector) {
	// 		if (chain) {
	// 			if (walletID) {
	// 				//if change account or change network do disconnect
	// 				if (walletID !== address) {
	// 					if (!isMobile) {
	// 						disconnect();
	// 						handleLogout();
	// 					}
	// 				}
	// 			} else {
	// 				// authen();
	// 			}
	// 		}
	// 	}
	// }, [address, isConnected, connector, chain]);

	return address ? (
		<Dropdown
			menu={{ items }}
			placement="bottomRight"
		>
			<Button
				className="gradient-border flex items-center !bg-base/10"
				size="large"
				type="primary"
			>
				{/* <WalletFilled /> */}
				{ellipsisAddress("0xtest" as string, 5)}
			</Button>
		</Dropdown>
	) : null;
};

export default WalletConnected;
