import { ellipsisAddress } from "@/utils/common";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { Button, Table, Tag, Typography } from "antd";

const ListWallets = () => {
	const dataSource: any = [
		{
			key: "1",
			name: "0x6599190Fe7C368c0900dDFcF167e2b2f12B7fee2",
			age: [42],
			address: "resource gravity pipe response dial pause claim thrive lens witness draw bounce",
		},
		{
			key: "2",
			name: "0x6599190Fe7C368c0900dDFcF167e2b2f12B7fee2",
			age: [42],
			address: "resource gravity pipe response dial pause claim thrive lens witness draw bounce",
		},
		{
			key: "4",
			name: "0x6599190Fe7C368c0900dDFcF167e2b2f12B7fee2",
			age: [42],
			address: "resource gravity pipe response dial pause claim thrive lens witness draw bounce",
		},
		{
			key: "5",
			name: "0x6599190Fe7C368c0900dDFcF167e2b2f12B7fee2",
			age: [89],
			address: "resource gravity pipe response dial pause claim thrive lens witness draw bounce",
		},
		{
			key: "6",
			name: "0x6599190Fe7C368c0900dDFcF167e2b2f12B7fee2",
			age: [4232, 86],
			address: "resource gravity pipe response dial pause claim thrive lens witness draw bounce",
		},
		{
			key: "7",
			name: "0x6599190Fe7C368c0900dDFcF167e2b2f12B7fee2",
			age: [452, 3],
			address: "resource gravity pipe response dial pause claim thrive lens witness draw bounce",
		},
		{
			key: "8",
			name: "0x6599190Fe7C368c0900dDFcF167e2b2f12B7fee2",
			age: [4552, 9],
			address: "resource gravity pipe response dial pause claim thrive lens witness draw bounce",
		},
		{
			key: "9",
			name: "0x6599190Fe7C368c0900dDFcF167e2b2f12B7fee2",
			age: [426, 89],
			address: "resource gravity pipe response dial pause claim thrive lens witness draw bounce",
		},
		{
			key: "10",
			name: "0x6599190Fe7C368c0900dDFcF167e2b2f12B7fee2",
			age: [42, 89],
			address: "resource gravity pipe response dial pause claim thrive lens witness draw bounce",
		},
		{
			key: "11",
			name: "0x6599190Fe7C368c0900dDFcF167e2b2f12B7fee2",
			age: [42, 89],
			address: "resource gravity pipe response dial pause claim thrive lens witness draw bounce",
		},
		{
			key: "12",
			name: "0x6599190Fe7C368c0900dDFcF167e2b2f12B7fee2",
			age: [42, 89],
			address: "resource gravity pipe response dial pause claim thrive lens witness draw bounce",
		},
		{
			key: "13",
			name: "0x6599190Fe7C368c0900dDFcF167e2b2f12B7fee2",
			age: [42, 89],
			address: "resource gravity pipe response dial pause claim thrive lens witness draw bounce",
		},
		{
			key: "14",
			name: "0x6599190Fe7C368c0900dDFcF167e2b2f12B7fee2",
			age: [42, 89],
			address: "resource gravity pipe response dial pause claim thrive lens witness draw bounce",
		},
	];

	const columns: any = [
		{
			title: "Address",
			dataIndex: "name",
			key: "name",
			render: (value: any, record: any) => {
				return (
					<div>
						{value ? (
							<Typography.Text
								copyable={{
									text: value,
									icon: [
										<CopyOutlined
											key="1"
											style={{ color: "#007d7f" }}
										/>,
										<CheckOutlined
											key="2"
											style={{ color: "#007d7f" }}
										/>,
									],
								}}
								className={`${record?.error ? "text-red-500 italic" : ""} `}
							>
								{ellipsisAddress(value?.toString(), 5)}
							</Typography.Text>
						) : (
							""
						)}
					</div>
				);
			},
			// align: "center",
		},
		{
			title: "Amount",
			dataIndex: "age",
			key: "age",
			render: (value: any, record: any) => {
				return (
					<div>
						{value?.map((e: any) => {
							if (e >= 100) {
								return <Tag color="green">{e} USDT</Tag>;
							} else {
								return <Tag color="#3f4041">{e} ETH</Tag>;
							}
						})}
					</div>
				);
			},
			// align: "center",
		},
		{
			title: "Seed pharse",
			dataIndex: "address",
			key: "address",
			// align: "center",
			render: (value: any, record: any) => {
				return (
					<div>
						{value ? (
							<Typography.Text
								copyable={{
									text: value,
									icon: [
										<CopyOutlined
											key="1"
											style={{ color: "#007d7f" }}
										/>,
										<CheckOutlined
											key="2"
											style={{ color: "#007d7f" }}
										/>,
									],
								}}
								className={`${record?.error ? "text-red-500 italic" : ""} `}
							>
								{value}
							</Typography.Text>
						) : (
							""
						)}
					</div>
				);
			},
		},
	];

	return (
		<div>
			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={false}
				scroll={{ x: 800, y: 450 }}
				bordered
				footer={() => (
					<Button
						className="gradient-btn-blue min-w-48"
						type="primary"
						size="large"
					>
						SCAN
					</Button>
				)}
			/>
		</div>
	);
};

export default ListWallets;
