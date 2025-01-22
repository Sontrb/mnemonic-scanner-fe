"use client";
import useLogout from "@/hooks/useLogout";
import { ellipsisAddress } from "@/utils/common";
import { LogoutOutlined } from "@ant-design/icons";
import Image from "next/image";
import styled from "styled-components";
import ListWallets from "./components/ListWallets";

const HomeViewContainer = styled.div`
	min-height: 100vh;
	background-image: url(/images/bg/background.jpg);
	min-height: 100vh;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	width: 100%;
	display: flex;
	flex-direction: column;
	& > * {
		position: relative;
		z-index: 2;
	}
`;

const HomeView = () => {
	const { logoutAndClearAll } = useLogout();

	return (
		<HomeViewContainer className="p-5 text-center">
			<div className="container mx-auto">
				<header className="sm:(flex justify-between items-center py-5)">
					<div className="my-5">
						<Image
							className="mx-auto"
							src={"/images/logo.png"}
							width={350}
							height={87}
							alt=""
						/>
					</div>

					<ul className="gradient-border-wallet">
						<li
							className="flex gap-5 items-center justify-center p-1 cursor-pointer"
							onClick={() => {
								logoutAndClearAll();
							}}
						>
							<span>
								<span className="text-xl">
									{ellipsisAddress("0x4c6049039a677d93c8b5b1e54ba2fad9bc21a163", 5)}
								</span>{" "}
								<LogoutOutlined
									style={{
										fontSize: 20,
										color: "#00ffaa",
										marginLeft: 10,
									}}
								/>
							</span>
						</li>
					</ul>
				</header>
				<div className="gap-10 my-10">
					<ListWallets />
				</div>
			</div>
			<p className="text-green-500 mt-auto">© {new Date().getFullYear()} Mnemonic Scanner</p>
		</HomeViewContainer>
	);
};

export default HomeView;
