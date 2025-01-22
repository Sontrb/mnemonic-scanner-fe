import { useChains } from "wagmi";

export const useGetBlockExplorers = () => {
	const chains = useChains();
	const result = chains.reduce((acc: any, network) => {
		acc[network.id] = network?.blockExplorers?.default.url;
		return acc;
	}, {});
	return result;
};
