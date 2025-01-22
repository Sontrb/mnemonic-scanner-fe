import { cloneDeep } from "lodash";
import { Connector } from "wagmi";

export const filterWallet = (connectors: readonly Connector[]) => {
	const connections = connectors.filter((item) => item.id !== "com.okex.wallet");
	return connections;
};

export const checkOkxWallet = (connectors: readonly Connector[]) => {
	const checkOkxWalletInjected = connectors.find((connector) => {
		return connector.type === "injected" && connector.id === "com.okex.wallet";
	});

	return checkOkxWalletInjected;
};

export const moveOkxWalletTFirst = (connectors: Connector[]) => {
	const results = cloneDeep(connectors);
	const index = connectors.findIndex(
		(connector) => connector.type === "injected" && connector.id === "com.okex.wallet",
	);

	if (index !== -1) {
		const [item] = results.splice(index, 1);
		results.unshift(item);
	}

	return results;
};
