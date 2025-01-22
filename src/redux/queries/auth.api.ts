import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./customFetchBase";

export const authApi = createApi({
	reducerPath: "authApi",
	tagTypes: ["auth"],
	refetchOnFocus: true,
	refetchOnReconnect: true,
	refetchOnMountOrArgChange: true,
	keepUnusedDataFor: 0,
	baseQuery: customFetchBase,
	endpoints(builder) {
		return {
			sendCode: builder.mutation<any, { email: string }>({
				query: (params) => ({
					url: "/api/auth/send-code",
					method: "POST",
					body: params,
				}),
			}),
		};
	},
});

export const { useSendCodeMutation } = authApi;
