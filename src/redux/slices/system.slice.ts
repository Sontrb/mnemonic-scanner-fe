import { createSlice } from "@reduxjs/toolkit";
import storage from "../configs/customeStorage";
import { useSelector } from "react-redux";

interface SystemStage {
	darkMode: boolean;
	showBtnSubscribe: boolean;
	language: string;
	selectedUserChainId?: number;
}

const initialState: SystemStage = {
	darkMode: false,
	showBtnSubscribe: true,
	language: "en",
	selectedUserChainId: undefined,
};

const systemSlice = createSlice({
	name: "system",
	initialState: initialState,
	reducers: {
		changeMode: (state) => {
			state.darkMode = !state.darkMode;
		},
		changeBtnSub: (state, action) => {
			state.showBtnSubscribe = action.payload;
		},

		changeLanguage: (state, action) => {
			state.language = action.payload;
		},
		updateSelectedChain: (state, { payload }) => {
			state.selectedUserChainId = payload;
		},
	},
	extraReducers(builder) {},
});

const systemPersistConfig = {
	key: "system",
	storage,
};

const systemReducer = systemSlice.reducer;
export const systemSelector = (state: any) => state.system;
export const useModeSelector = () => useSelector((state: any) => state.system.darkMode);
export const useBtnSubSelector = () => useSelector((state: any) => state.system.showBtnSubscribe);
export const useLanguage = () => useSelector((state: any) => state.system.language);
export const useSelectedUserChainId = () => useSelector((state: any) => state.system.selectedUserChainId);

export const { changeMode, changeBtnSub, changeLanguage, updateSelectedChain } = systemSlice.actions;
export { systemReducer, systemPersistConfig };
