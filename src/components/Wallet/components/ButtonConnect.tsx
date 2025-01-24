"use client";

import useLogout from "@/hooks/useLogout";
import { actionSelector, showModalConnectWallet } from "@/redux/slices/action.slice";
import { Button } from "antd";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const ButtonConnect: React.FunctionComponent<any> = (props) => {
	const { t } = useTranslation();
	// const { isConnected, address, connector } = useAccount();
	const { isVisibleModalConnectWallet, isVisibleModalSignMessage, isVisibleModalSwitchNetwork } =
		useSelector(actionSelector);
	const { logoutAndClearAll } = useLogout();
	const dispatch = useDispatch();

	const openConnectWallet = () => {
		dispatch(showModalConnectWallet());
	};

	return (
		<>
			<Button
				size="large"
				className="gradient-btn-blue"
				type="primary"
				onClick={openConnectWallet}
			>
				<Trans i18nKey={"cmp_wallet__btn"}>
					Connect <span className="hidden sm:inline-block">Wallet</span>
				</Trans>
			</Button>
		</>
	);
};

export default ButtonConnect;
