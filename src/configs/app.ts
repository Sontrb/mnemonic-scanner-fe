const bscChainId = process.env.NEXT_PUBLIC_BNB_CHAIN_ID as any;

export const LOGIN_MESSAGE = "Welcome";

export const listChain = [
	{
		name: "Bsc Chain",
		icon: "/images/logo.png",
		chainId: parseInt(bscChainId),
	},
];
