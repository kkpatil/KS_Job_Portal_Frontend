import { api } from "../api";

export const contactApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendContactMessage: builder.mutation({
      query: (payload) => ({
        url: "/contactus/contact",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
  overrideExisting: false,
});

export const { useSendContactMessageMutation } = contactApi;
