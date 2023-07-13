import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import config from "../config/config.json";

interface Quote {
  id: number;
  quote: string;
  author: string;
}

const address = config["quotes"];

export const quotesApi = createApi({
  reducerPath: "quotes",
  baseQuery: fetchBaseQuery({ baseUrl: address }),
  endpoints: (builder) => ({
    getQuotes: builder.query<Quote[], void>({
      query: () => "/quotes",
    }),
  }),
});

export const { useGetQuotesQuery } = quotesApi;
