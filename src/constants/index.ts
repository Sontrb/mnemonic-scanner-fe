import { defineChain } from "viem";
import { bsc, bscTestnet, polygonAmoy, polygon } from "viem/chains";

export const LOGIN_MESSAGE = "AdminSystem";

export const DEFAULT_PAGE_SIZE = 10;
export enum InternalTxType {
	Network,
	Task,
	Referral,
}

export enum TxType {
	Deposit,
	Withdraw,
}

export enum TxStatus {
	Failed,
	Success,
	Pending,
}
export const RESPONSE_STATUS = {
	ERROR: "ERROR",
	SUCCESS: "SUCCESS",
};

export const ENV = {
	DEV: "dev",
	PROD: "prod",
};

export const ERROR_CODE_METAMASK = {
	USER_REJECT_TX: 4001,
};

export const LANG = {
	en: "en",
	th: "th",
};

export const polygonAmoyTestnet = defineChain({
	id: 80002,
	name: " Polygon Amoy Testnet",
	network: "Amoy",
	nativeCurrency: {
		decimals: 18,
		name: "MATIC",
		symbol: "MATIC",
	},
	rpcUrls: {
		default: {
			http: ["https://rpc-amoy.polygon.technology/"],
		},
		public: {
			http: ["https://rpc-amoy.polygon.technology/"],
		},
	},
	blockExplorers: {
		default: {
			name: "Amoy scan",
			url: " https://amoy.polygonscan.com/",
		},
	},
});

export const getListChain = () => {
	const env = process.env.NEXT_PUBLIC_ENV;
	if (ENV.DEV === env) {
		return [bscTestnet, polygonAmoy];
	}
	return [bsc, polygon];
};

export const getChain = (chainId: number) => {
	const list = getListChain();
	const chain = list.find((item) => item.id === chainId);

	return chain;
};

export const ERROR_VERIFY = {
	MSG_DATA_INVALID: "Invalid verification code!",
	MSG_CODE_VERIFY_NOT_MATCH: "Invalid verification code!",
	MSG_CODE_VERIFY_EXPIRED: "Your verification code has expired. Please request a new one.",
	MSG_RESEND_CODE_VERIFY_LIMIT: "Unable to resend code. Please wait at least 5 minutes before requesting a new one",
	MSG_ADDRESS_OR_EMAIL_EXIST: "This email address is already registered.",
	MSG_USER_REF_NOT_FOUND: "Code is invalid!",
};

export const MESSAGE_SIGN = "1234";
