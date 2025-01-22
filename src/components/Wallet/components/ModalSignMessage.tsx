"use client";

// import { useVerifyMutation } from "@/redux/queries/auth.api";
import { actionSelector, hideModalSignMessage, showModalRegister } from "@/redux/slices/action.slice";
import { Button, Modal, Spin, Typography, message } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useSignMessage } from "wagmi";
import { Trans, useTranslation } from "react-i18next";
import ModalAntCustome from "@/components/ModalAntCustome";
import { MESSAGE_SIGN } from "@/constants";
import { useRouter } from "next/navigation";

const ModalSignMessage: React.FunctionComponent = () => {
	const { t } = useTranslation();
	const { isVisibleModalSignMessage } = useSelector(actionSelector);
	const { address, connector } = useAccount();
	const [loading, setLoading] = useState(false);
	const { signMessageAsync, isPending: isLoading } = useSignMessage();
	const dispatch = useDispatch();
	const router = useRouter();
	const timestamp = moment().unix();
	const hashmessage = timestamp.toString() + "#" + MESSAGE_SIGN;

	const handleSignMessage = async () => {
		setLoading(true);
		try {
			const signature = await signMessageAsync({ message: hashmessage, account: address, connector: connector });
			if (signature) {
				// const result = await verify({
				// 	message: hashmessage,
				// 	address: address as string,
				// 	signature: signature,
				// }).unwrap();
				// if ("data" in result) {
				// 	dispatch(
				// 		authenticated({
				// 			walletID: address as string,
				// 			accessToken: result.data.accessToken,
				// 			refreshToken: result.data.refreshToken,
				// 			walletType: "EVM",
				// 		}),
				// 	);
				// 	const data = await triggerGetDetailUser().unwrap();
				// 	dispatch(
				// 		updateProfile({
				// 			userProfile: data?.data,
				// 		}),
				// 	);
				// 	dispatch(hideModalSignMessage());
				// }
				// if ("error" in result) {
				// 	throw Error((result.error as any)?.message);
				// }
			}
		} catch (error: any) {
			var msg = error?.cause?.message;
			if (!msg) msg = error?.message;
			if (!msg) msg = error?.data?.message;
			if (msg === "USER_NOT_FOUND") {
				msg = "No rewards are available here. Please connect correct wallet!";
			}
			if (!msg) msg = "Please try again";
			message.error(`${msg}`);
		}
		setLoading(false);
	};

	const handleCloseSignMessage = () => {
		dispatch(hideModalSignMessage());
		// logoutAndClearAll();
	};

	return (
		<ModalAntCustome
			open={isVisibleModalSignMessage}
			footer={null}
			onCancel={handleCloseSignMessage}
		>
			<Spin>
				<div className="p-5  shadow">
					<div>
						<div className="flex justify-center items-center">
							<Typography.Title
								level={3}
								className="!text-base-light font-extrabold tracking-wider"
							>
								{t("cmp_msm_tit", {
									defaultValue: "Sign message",
								})}
							</Typography.Title>
						</div>
						<p className="font-normal text-sm text-txt-primary text-center text-light-700">
							{t("cmp_msm_des", {
								defaultValue: "Please sign message or disconnect to continue.",
							})}
						</p>
					</div>

					{/* <div className="modal-body">{hashmessage}</div> */}
					<div className="mt-5">
						<div className=" m-3 flex justify-content-between gap-3">
							<Button
								type="default"
								className="w-full"
								onClick={handleCloseSignMessage}
								size="large"
							>
								{t("cmp_msm_btn_Disconnect", {
									defaultValue: "Disconnect",
								})}
							</Button>
							<Button
								type="primary"
								loading={isLoading}
								className="w-full"
								onClick={handleSignMessage}
								size="large"
							>
								{t("cmp_msm_btn_Sign", {
									defaultValue: "Sign",
								})}
							</Button>
						</div>
					</div>
				</div>
			</Spin>
		</ModalAntCustome>
	);
};

export default ModalSignMessage;
