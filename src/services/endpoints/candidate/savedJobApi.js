import { api } from "../../api";

export const savedJobApi = api.injectEndpoints({
  endpoints: (builder) => ({
    toggleSaveJob: builder.mutation({
      query: (jobId) => ({
        url: `/saved-jobs/${jobId}`,
        method: "POST", // toggle logic backend me ho to POST enough
      }),
      invalidatesTags: ["SavedJobs"],
    }),

    getSavedJobs: builder.query({
      query: () => "/saved-jobs",
      transformResponse: (response) =>
        Array.isArray(response?.data) ? response.data : [],
      providesTags: ["SavedJobs"],
    }),
    deleteSavedJob: builder.mutation({
      query: (jobId) => ({
        url: `/saved-jobs/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedJobs"],
    }),
  }),
});

export const {
  useToggleSaveJobMutation,
  useGetSavedJobsQuery,
  useDeleteSavedJobMutation,
} = savedJobApi;
