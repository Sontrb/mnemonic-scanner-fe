"use client";

import { enforcer, formatNumber } from "@/utils/common";
import { Input, Select } from "antd";
import Image from "next/image";
import React, { memo, use, useState } from "react";
import { styled } from "styled-components";
import { formatCurrency } from "@coingecko/cryptoformat";
import SelectedCustom from "../SelectedCustom";
import { Trans, useTranslation } from "react-i18next";

interface PropsWrapDiv {
	$showerror: string;
}

const WrapDiv = styled.div<PropsWrapDiv>`
	border: 1px solid #424242;
	color: white;
	background-color: #141414;
	padding: 20px;
	border-radius: 8px;
	padding-bottom: ${(props) => {
		return props.$showerror === "true" ? "0px" : "20px";
	}} !important;

	.ant-select-selector,
	.ant-select-arrow {
		color: white;
		font-size: 20px;
		margin-right: -11px;
	}
	.ant-input::placeholder {
		color: white; /* Màu tùy chỉnh của placeholder */
	}
	.mt-20 {
		margin-top: 20px;
	}
	.select-style {
		/* width: 200px; */
	}
	.ant-select-selection-item > div {
		display: flex;
		align-items: center;
		padding: 0px !important;
	}

	.text-select {
		/* margin-right: 26px; */
		display: flex;
		align-items: center;
		padding: 0px !important;
		color: white;
		font-size: 20px;
		padding: 0px 11px !important;
	}

	.ant-select-selection-item {
		margin-right: 12px;
		padding-inline-end: 40px !important;
	}
	.max {
		cursor: pointer;
	}

	.ms-2 {
		color: #ffffffc0 !important;
	}

	.font-14 {
		font-size: 14px;
	}

	.ant-input {
		font-weight: 700 !important;
	}

	.error {
		color: #f0a600;
		font-size: 12px;
		margin-bottom: 0px;
	}
`;

const WrapInput = styled(Input)`
	font-size: 20px;
	padding: 0px;
`;

interface Props {
	valueInput?: string;
	onChangeValueInput: (value: string) => void;
	valueSelected?: any;
	onChangeValueSelected: (value: any) => void;
	text?: any;
	onClickMax?: () => void;
	showerror?: any;
	max?: string | number;
	showSelect?: boolean;
	disabled?: boolean;
	chainId: number;
}

function InputCurrency(props: Props) {
	const {
		valueInput,
		onChangeValueInput,
		valueSelected,
		onChangeValueSelected,
		text = "Send:",
		onClickMax,
		showerror,
		max,
		showSelect = true,
		disabled = false,
		chainId,
	} = props;
	const { t } = useTranslation();

	const maxBalance = formatCurrency(Number(max) || 0, "ETH", "en", true, {
		decimalPlaces: 8,
	});

	return (
		<WrapDiv
			$showerror={(!!showerror).toString()}
			className="flex flex-col"
		>
			<div className="flex font-14  justify-between">
				<div className="mr-4">{text}</div>
				<div className="">
					{t("cmp_input_Available", {
						defaultValue: "Available:",
					})}{" "}
					{formatNumber(Number(max || 0))}
				</div>
				{/* {onClickMax && (
					<div
						className={`border-bottom border-white ${"max"}`}
						onClick={onClickMax}
					>
						Max: {maxBalance}
					</div>
				)} */}
			</div>
			<div className="flex justify-content-between mt-20">
				<WrapInput
					className="me-2 text-white"
					value={valueInput}
					placeholder="0.0"
					onChange={(e) => {
						enforcer(e.target.value.replace(/,/g, "."), (val: any) => {
							if (/^\d+(\.\d{0,18})?$/.test(val) || val === "") {
								onChangeValueInput(val);
							}
						});
					}}
					disabled={disabled}
					variant={"borderless"}
				/>

				<SelectedCustom
					defaultValue="USDT"
					value={valueSelected?.name}
					className=" text-white "
					options={[]}
					style={{ minWidth: "unset" }}
					variant={"borderless"}
				/>
			</div>
			{showerror}
		</WrapDiv>
	);
}

export default memo(InputCurrency);
