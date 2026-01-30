import { api } from "../api";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => "/auth/me",
      providesTags: ["Profile"],
    }),
  }),
});

export const { useGetMyProfileQuery } = profileApi;
