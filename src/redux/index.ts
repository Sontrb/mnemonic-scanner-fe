import actionSlice from "@/redux/slices/action.slice";
import { systemPersistConfig, systemReducer } from "@/redux/slices/system.slice";
import createSagaMiddleware from "redux-saga";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { useDispatch } from "react-redux";
import { FLUSH, REHYDRATE, persistReducer, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "./configs/customeStorage";
import { publicApi } from "./queries/public.api";
const rootPersistConfig = {
	key: "root",
	storage,
	whitelist: [systemPersistConfig.key],
};
let sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
	[publicApi.reducerPath]: publicApi.reducer,
	action: actionSlice,
	system: systemReducer,
});

const appReducer = (state: ReturnType<typeof rootReducer>, action: any) => {
	return rootReducer(state, action);
};

const middlewares = [publicApi.middleware, sagaMiddleware];
const persistedReducer = persistReducer(rootPersistConfig, appReducer as any);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: true,
			immutableCheck: true,
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(middlewares) as any,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const state = store.getState();
export default store;
