import { useModeSelector } from "@/redux/slices/system.slice";
import { Select, SelectProps } from "antd";
import React, { memo, useEffect } from "react";
import { styled } from "styled-components";

interface Props extends SelectProps {
	children?: any;
	classNameWrap?: string;
}

const WrapSelect = styled.div`
	.ant-select {
		/* min-width: 120px; */
	}
`;

const SelectedCustom = (props: Props) => {
	const { children, classNameWrap, ...prop } = props;

	return (
		<Select
			style={{ minWidth: 120 }}
			{...prop}
		>
			{children}
		</Select>
	);
};

export default memo(SelectedCustom);
