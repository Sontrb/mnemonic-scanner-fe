"use client";

import ConnectWallet from "@/components/Wallet";
import { LANG } from "@/constants";
import useLogout from "@/hooks/useLogout";
import { changeLanguage, useLanguage } from "@/redux/slices/system.slice";
import { isMobile } from "@/utils/common";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import i18next from "i18next";
import moment from "moment";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const HeaderCustome = () => {
	const lang = useLanguage();
	const { t } = useTranslation();
	const router = useRouter();
	const { logoutAndClearAll } = useLogout();
	const path = usePathname();
	const dispatch = useDispatch();

	const items = useMemo(() => {
		return [];
	}, [path, lang]);

	useEffect(() => {
		if (!isMobile) {
			logoutAndClearAll();
		}
	}, [path]);

	useEffect(() => {
		const lang = LANG.en;
		dispatch(changeLanguage(lang));
		i18next.changeLanguage(lang);
		moment.locale(lang);
	}, []);

	return (
		<div className="flex flex-col gap-4 items-center justify-between xl:(justify-end flex-row)">
			<div
				className="flex flex-row xl:hidden items-center justify-center p-4 xl:(p-10) cursor-pointer"
				onClick={() => {
					router.push("/");
				}}
			>
				<Image
					src={"/images/logo.svg"}
					width={194}
					height={48}
					alt=""
				/>
			</div>
			<div className="flex items-center">
				<ConnectWallet />
				<Dropdown
					menu={{ items }}
					placement="bottomRight"
					className="ml-3  block xl:hidden"
				>
					<Button
						size="large"
						icon={<UnorderedListOutlined />}
						type="primary"
						ghost
					/>
				</Dropdown>
			</div>
		</div>
	);
};

export default HeaderCustome;
