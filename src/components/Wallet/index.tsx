/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import ButtonConnect from "./components/ButtonConnect";
import ModalConnectWallet from "./components/ModalConnectWallet";
import ModalSignMessage from "./components/ModalSignMessage";
import ModalSwitchNetwork from "./components/ModalSwitchNetwork";
import WalletConnected from "./components/WalletConnected";
// import ModalRegister from "../ModalRegister";

const ConnectWallet: React.FunctionComponent = () => {
	return (
		<>
			{/* <TokenInfo /> */}
			{/* <ChainInfo /> */}
			<ButtonConnect />
			<WalletConnected />
			<ModalConnectWallet />
			<ModalSwitchNetwork />
			<ModalSignMessage />
			{/* <ModalRegister /> */}
		</>
	);
};
``;

export default ConnectWallet;
