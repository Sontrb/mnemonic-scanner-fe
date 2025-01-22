import { useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useDisconnect } from "wagmi";

const useLogout = () => {
	const dispatch = useDispatch();
	const { disconnect } = useDisconnect();

	const logoutAndClearAll = useCallback(() => {
		disconnect();
	}, []);

	return { logoutAndClearAll };
};

export default useLogout;
