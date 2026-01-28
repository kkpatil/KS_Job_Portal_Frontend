// services/endpoints/settingsApi.js
import { api } from "../api";

export const settingsApi = api.injectEndpoints({
  endpoints: (build) => ({

    getSettings: build.query({
      query: () => "/settings",
      providesTags: ["Settings"],
    }),

    updateSettings: build.mutation({
      query: (data) => ({
        url: "/settings",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),

  }),
});

export const {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} = settingsApi;
