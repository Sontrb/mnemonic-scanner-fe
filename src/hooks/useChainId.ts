import { actionSelector } from "@/redux/slices/action.slice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

const useChainId = () => {
	const { chain, connector, isConnected } = useAccount();
	const { isVisibleModalSwitchNetwork } = useSelector(actionSelector);
	const [chainId, setChainId] = useState(0);

	useEffect(() => {
		const checkChainChanged = async () => {
			if (typeof connector?.getChainId === "function") {
				const cId = await connector?.getChainId();
				setChainId(cId);
			}
		};
		checkChainChanged();
	}, [chain, connector, isConnected, isVisibleModalSwitchNetwork]);

	return chainId;
};

export default useChainId;
