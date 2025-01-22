import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const publicApi = createApi({
	reducerPath: "publicApi",
	tagTypes: ["Public"],
	refetchOnFocus: true,
	refetchOnReconnect: true,
	refetchOnMountOrArgChange: true,
	keepUnusedDataFor: 60,
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API }),
	endpoints(builder) {
		return {};
	},
});

export const {} = publicApi;
