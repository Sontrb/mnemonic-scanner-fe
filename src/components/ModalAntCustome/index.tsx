import { Modal, ModalProps } from "antd";
import { Roboto_Mono, Open_Sans } from "next/font/google";
import Image from "next/image";
import React, { memo } from "react";
import styled from "styled-components";

const WrapModal = styled(Modal)`
	font-family: var(--font-plus);
	.ant-modal-title {
		display: flex;
		justify-content: center;
		font-size: 20px;
	}
	.ant-modal-body {
		margin-top: 20px;
		border: 1px solid var(--border);
	}

	@media (min-width: 992px) {
		/* .ant-modal-close {
			top: 30px;
			inset-inline-end: 30px;
			color: white;
		} */
	}

	
`;

// If loading a variable font, you don't need to specify the font weight
const inter = Roboto_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-plus",
	weight: ["100", "200", "300", "400", "500", "600", "700"],
});

interface Props extends ModalProps {}
const ModalAntCustom = (props: Props) => {
	return (
		<WrapModal
			closeIcon={false}
			className={`${inter.className}`}
			{...props}
		></WrapModal>
	);
};

export default memo(ModalAntCustom);
