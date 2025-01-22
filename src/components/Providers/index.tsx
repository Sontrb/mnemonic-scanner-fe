"use client";
// import theme from "@/configs/themeConfig";
import { useModeSelector } from "@/redux/slices/system.slice";
import { ConfigProvider } from "antd";
import React, { useEffect } from "react";
import { theme } from "antd";
import ReduxProvider from "@/redux/configs/ReduxProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/i18n";
import { WagmiProvider } from "wagmi";
import config from "@/configs/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "@/layout/ErrorBoundaryCustome";

export function StyleProviders({ children }: { children: React.ReactNode }) {
	const darkMode = useModeSelector();
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => setMounted(true), []);

	useEffect(() => {
		document.body.classList.toggle("dark-mode", darkMode);
	}, [darkMode]);
	const queryClient = new QueryClient();
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<ConfigProvider
					theme={{
						token: {
							fontFamily: "var(--font-plus)",
							colorTextBase: "#ffffff80",
							controlHeightLG: 52,
							colorBgBase: "#000",
							colorPrimary: "#33cc99",
							colorInfo: "#2f80ed",
							fontSize: 16,
							borderRadius: 6,
						},
						components: {
							Layout: {
								siderBg: "rgb(20, 20, 20)",
								headerBg: "rgb(20, 20, 20)",
								triggerBg: "rgb(20, 20, 20)",
							},
							Modal: {
								algorithm: true,
								titleFontSize: 24,
								contentBg: "#000",
								titleColor: "#FFF",
								headerBg: "rgba(255,255,255,0)",
							},
							Tag: {
								lineHeight: 2,
								paddingXXS: 8,
								borderRadiusSM: 2,
							},
							Segmented: {
								controlHeightLG: 52,
								itemSelectedColor: "#FFF",
							},
							Notification: {
								algorithm: theme.darkAlgorithm,
							},
							Message: {
								algorithm: true,
							},
							Empty: {
								algorithm: true,
							},
							Button: {
								defaultShadow: "0 1px 0 rgba(0, 0, 0, 0.02)",
								algorithm: true,
								contentFontSize: 14,
								paddingBlock: 12,
								controlHeightLG: 52,
							},
							Divider: {
								colorText: "#59edf1",
								colorSplit: "rgb(79,79,79)",
								fontSize: 16,
							},
							DatePicker: {
								controlHeightLG: 52,
							},
							Form: {
								controlHeightLG: 52,
							},
							Input: {
								controlHeightLG: 52,
							},
							InputNumber: {
								controlHeightLG: 52,
							},
							Table: {
								colorBgContainer: "transparent",
								headerColor: "#00dce4",
								colorText: "rgba(255,255,255,0.88)",
								headerBg: "transparent",
								rowHoverBg: "#4e4d4d",
							},
							Card: {
								colorBgContainer: "tranparent",
							},
						},
						algorithm: theme.darkAlgorithm,
					}}
				>
					{mounted && children}
				</ConfigProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ErrorBoundary>
			<ReduxProvider>
				<I18nextProvider i18n={i18n}>
					<StyleProviders>{children}</StyleProviders>
				</I18nextProvider>
			</ReduxProvider>
		</ErrorBoundary>
	);
}
