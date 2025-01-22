import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

const baseQuery = (token: string) =>
	fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API,
		prepareHeaders(headers, api) {
			headers.set("Authorization", `Bearer ${token}`);
			return headers;
		},
	});

// @ts-ignore
export const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions,
) => {
	try {
		// @ts-ignore
		const token = api.getState().auth.accessToken;
		// @ts-ignore
		const refreshtk = api.getState().auth.refreshToken;

		let result: any = await baseQuery(token)(args, api, extraOptions);
		if (result.error && result.error.status === 401) {
			const refreshResult = await fetchBaseQuery({
				baseUrl: process.env.NEXT_PUBLIC_API,
				method: "GET",
				headers: {
					Authorization: `Bearer ${refreshtk}`,
					"Content-Type": "application/json",
				},
			})(`/api/auth/refresh-token`, api, extraOptions);
			if (refreshResult.data) {
				// retry the initial query
				result = await baseQuery((refreshResult.data as any).data.accessToken)(args, api, extraOptions);
			}
		}
		const originalStatus = result?.data?.status;
		result.data = {
			...(result?.data || {}),
			...result?.data?.data?.data?.map((e: any) => {
				return {
					...e,
					key: Math.floor(Math.random() * 1000000),
				};
			}),
			status: originalStatus?.toUpperCase(),
		};
		return result;
	} catch (e) {
		console.log(e);
	}
};
