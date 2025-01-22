import { Empty, Table, TableProps } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledTable = styled(Table)`
	.ant-table-thead {
		.ant-table-cell {
			text-transform: uppercase;
			font-size: 12px;
			letter-spacing: 1px;
			font-weight: 400;
		}
	}
`;

const ResponsiveTable = (props: TableProps) => {
	const { t } = useTranslation();
	return (
		// @ts-ignore
		<StyledTable
			{...props}
			scroll={{
				x: 1400,
			}}
			locale={{
				emptyText() {
					return (
						<Empty
							image={Empty.PRESENTED_IMAGE_SIMPLE}
							description={t("table_empty", {
								defaultValue: "No data",
							})}
						/>
					);
				},
			}}
		/>
	);
};
export default ResponsiveTable;
