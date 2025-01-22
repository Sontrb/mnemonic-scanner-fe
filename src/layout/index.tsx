"use client";
import React, { useEffect } from "react";
import { Layout } from "antd";
import styled from "styled-components";

const { Content } = Layout;

const CustomeLayout = styled(Layout)``;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Layout className="min-h-full">
				<CustomeLayout className="side-right">
					<Content>{children}</Content>
				</CustomeLayout>
			</Layout>
		</>
	);
};

export default MainLayout;
