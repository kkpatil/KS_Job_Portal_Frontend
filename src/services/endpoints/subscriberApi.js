import { api } from "../api";

export const subscriberApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubscribers: builder.query({
      query: () => ({
        url: "/subscribe",
        method: "GET",
      }),
      providesTags: ["Subscriber"],
    }),
    updateSubscriber: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subscribe/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Subscriber"],
    }),
    deleteSubscriber: builder.mutation({
      query: (id) => ({
        url: `/subscribe/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscriber"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSubscribersQuery,
  useUpdateSubscriberMutation,
  useDeleteSubscriberMutation,
} = subscriberApi;
