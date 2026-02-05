import { api } from "../api"; // base api import

export const subscribeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation({
      query: (email) => ({
        url: "/subscribe", // backend ka route
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["Subscriber"],
    }),
  }),
  overrideExisting: false,
});

export const { useSubscribeMutation } = subscribeApi;
