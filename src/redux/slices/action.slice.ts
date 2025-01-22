import { RootState } from "@/redux";
import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface ActionState {
	isVisibleModalConnectWallet: boolean;
	isVisibleModalSwitchNetwork: boolean;
	isVisibleModalSignMessage: boolean;
	isVisibleModalRegister: boolean;
	chainId?: number;
	needSwitchToChain?: number;
	selectedUserChainId?: number;
	referralId?: string;
}

const initialState: ActionState = {
	isVisibleModalConnectWallet: false,
	isVisibleModalSwitchNetwork: false,
	isVisibleModalSignMessage: false,
	isVisibleModalRegister: false,
	chainId: undefined,
	selectedUserChainId: undefined,
};

const actionSlice = createSlice({
	name: "action",
	initialState: initialState,
	reducers: {
		showModalConnectWallet: (state) => {
			state.isVisibleModalConnectWallet = true;
			state.chainId = undefined;
		},
		hideModalConnectWallet: (state) => {
			state.isVisibleModalConnectWallet = false;
			state.chainId = undefined;
		},
		showModalSwitchNetwork: (state, action: PayloadAction<{ chainId: number } | undefined>) => {
			state.isVisibleModalSwitchNetwork = true;
			if (action?.payload) state.chainId = action?.payload.chainId;
		},
		hideModalSwitchNetwork: (state) => {
			state.isVisibleModalSwitchNetwork = false;
			state.chainId = undefined;
		},
		showModalSignMessage: (state) => {
			state.isVisibleModalSignMessage = true;
		},
		hideModalSignMessage: (state) => {
			state.isVisibleModalSignMessage = false;
		},
		showModalRegister: (state) => {
			state.isVisibleModalRegister = true;
		},
		hideModalRegister: (state) => {
			state.isVisibleModalRegister = false;
		},
		updateSelectedChain: (state, { payload }) => {
			state.selectedUserChainId = payload;
		},
	},
	extraReducers(builder) {},
});

// Action creators
export const {
	showModalConnectWallet,
	hideModalConnectWallet,
	showModalSwitchNetwork,
	hideModalSwitchNetwork,
	showModalSignMessage,
	hideModalSignMessage,
	showModalRegister,
	hideModalRegister,
	updateSelectedChain,
} = actionSlice.actions;

// Selector
export const actionSelector = (state: any) => state.action;
export const useChainIdSelector = () => useSelector((state: any) => state.action.chainId);

export default actionSlice.reducer;
