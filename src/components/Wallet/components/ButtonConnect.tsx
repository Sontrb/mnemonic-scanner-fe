"use client";

import iconWallet from "@/assets/images/icon-wallet.svg";
import useLogout from "@/hooks/useLogout";
import { actionSelector, showModalConnectWallet } from "@/redux/slices/action.slice";
import { authSelector, useIsLogin } from "@/redux/slices/auth.slice";
import { isInListChain } from "@/utils/common";
import { Button } from "antd";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { Trans, useTranslation } from "react-i18next";
interface Props {
	titleBtn?: string;
}

const ButtonConnect: React.FunctionComponent<Props> = (props) => {
	const { t } = useTranslation();
	const { walletID } = useSelector(authSelector);
	const { isConnected, address, connector } = useAccount();
	const { isVisibleModalConnectWallet, isVisibleModalSignMessage, isVisibleModalSwitchNetwork } =
		useSelector(actionSelector);
	const { logoutAndClearAll } = useLogout();
	const isLogin = useIsLogin();
	const dispatch = useDispatch();

	const openConnectWallet = () => {
		dispatch(showModalConnectWallet());
	};

	return (
		(!isLogin || !address) && (
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
		)
	);
};

export default ButtonConnect;
