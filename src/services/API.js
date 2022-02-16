import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const API = createApi({
  reducerPath: "API",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hiring-test.stag.tekoapis.net/api/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),
    getColor: builder.query({
      query: () => "colors",
    }),
  }),
});
