import { useRouter } from "next/router";

const useTrans = <T, T1>(en: T, vn: T1) => {
	const { locale } = useRouter();

	const trans = locale === "en" ? en : vn;

	return trans;
};

export default useTrans;
