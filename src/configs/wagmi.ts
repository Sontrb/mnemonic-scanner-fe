import { getListChain } from "@/constants";
import { http, createConfig } from "wagmi";
import { bsc, bscTestnet, polygon, polygonAmoy } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

const projectId = "7c06df794bafcf1b589c2d942588616a";
const listChains = getListChain();

export const config = createConfig({
	chains: [polygon, polygonAmoy, bsc, bscTestnet],
	connectors: [injected(), walletConnect({ projectId })],
	transports: {
		[polygon.id]: http(polygon.rpcUrls.default.http[0], {
			timeout: 120_000
		}),
		[polygonAmoy.id]: http(polygonAmoy.rpcUrls.default.http[0], {
			timeout: 120_000
		}),
		[bsc.id]: http(bsc.rpcUrls.default.http[0], {
			timeout: 120_000
		}),
		[bscTestnet.id]: http(bscTestnet.rpcUrls.default.http[0], {
			timeout: 120_000
		}),
	},
} as any);
export default config;
