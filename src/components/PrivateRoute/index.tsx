"use client";
import ModalConnectWallet from "@/components/Wallet/components/ModalConnectWallet";
import ModalSignMessage from "@/components/Wallet/components/ModalSignMessage";
import { showModalConnectWallet } from "@/redux/slices/action.slice";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const LoginViewContainer = styled.div`
	background-image: url(/images/bg/BG_Desktop.png);
	min-height: 100vh;
	background-size: cover;
	background-repeat: no-repeat;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
	@media (max-width: 1280px) {
		background-size: cover;
		background-position: 50%;
	}
`;
interface PrivateRouteProps {
	children: React.ReactNode;
}

const PrivateRoute = (props: PrivateRouteProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	return true ? (
		props.children
	) : (
		<LoginViewContainer>
			<ModalConnectWallet />
			<ModalSignMessage />
			<div>
				<Image
					src={"/images/logo.svg"}
					width={194}
					height={48}
					alt=""
				/>
			</div>
			<div className="flex flex-col gap-[100px]">
				<Image
					src={"/images/bg/Button_Desktop.svg"}
					alt={"button"}
					width={357}
					height={124}
					className="cursor-pointer mx-auto"
					onClick={() => {
						dispatch(showModalConnectWallet());
					}}
				/>{" "}
				<p className="text-[#00ffaa] mt-auto">© {new Date().getFullYear()} Mnemonic Scanner</p>
			</div>
		</LoginViewContainer>
	);
};

export default PrivateRoute;
