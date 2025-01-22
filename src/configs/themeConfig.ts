// theme/themeConfig.ts
import type { ThemeConfig } from "antd";

const theme = (darkMode: boolean): ThemeConfig => {
	return {
		token: {
			colorPrimary: "#101624",
			colorSuccess: "#101624",
			colorSuccessActive: "#101624",
			colorSuccessTextActive: "#101624",
			colorLink: "#101624",
			fontFamily: "var(--font-plus)",
			colorTextBase: "#191919",
			controlHeight: 50,
			borderRadius: 5,
			fontSize: 16,
			colorBorder: "#E7E7E7",
			colorBgContainer: "#01140E",
		},
		components: darkMode
			? {
					Select: {
						colorText: "#fff",
					},
				}
			: {
					Select: {
						colorText: "#fff",
						optionSelectedColor: "#fff",
						optionSelectedBg: "black",
						optionActiveBg: "#001529",
						colorBgContainer: "#001529",
						colorBgElevated: "#001529",
					},
					Dropdown: {
						colorText: "#fff",
						colorBgContainer: "#001529",
						colorBgElevated: "#001529",
					},
					Button: {
						controlHeight: 50,
						defaultBg: "#6366f1",
					},
					Input: {
						borderRadius: 8,
						fontWeightStrong: 400,
						colorText: "white",
						fontSize: 14,
						padding: 8,
					},
					Form: {
						labelColor: "#757575",
						fontSize: 14,
						colorTextLabel: "#757575",
						fontWeightStrong: 600,
					},
					Layout: {
						boxShadow: "0",
						padding: 24,
					},
					Table: {
						headerBg: "#171423",
						headerColor: "#e9ecef",
						borderRadius: 16,
						fontSize: 14,
						padding: 20,
						colorText: "#e9ecef",
						cellPaddingBlock: 20,
						cellPaddingInline: 16,
						fontWeightStrong: 500,
						borderColor: "#242332",
						rowHoverBg: "#1B1A28",
					},
					Modal: {
						titleColor: "#fff",
						fontWeightStrong: 600,
						padding: 20,
						contentBg: "#191919",
					},
					Card: {
						padding: 12,
					},
					Tree: {
						titleHeight: 45,
					},
					Spin: {
						dotSize: 16,
						colorPrimary: "#FFF",
					},
					Message: {
						contentBg: "#1B1A28",
					},
					Notification: {
						colorText: "#fff",
					},
					Tabs: {
						itemColor: "#fff",
						itemSelectedColor: "#6366f1",
						inkBarColor: "#6366f1",
						itemActiveColor: "#6366f1",
						itemHoverColor: "#6366f1",
					},
				},
	};
};

export default theme;
