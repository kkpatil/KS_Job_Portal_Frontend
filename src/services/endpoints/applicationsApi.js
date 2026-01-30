import { api } from "../api";

export const applicationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllApplications: builder.query({
      query: () => ({
        url: "/applications/admin",
        method: "GET",
        providesTags: ["Applications"],
      }),

      transformResponse: (response) => {
        if (Array.isArray(response?.applications)) {
          return response.applications;
        }
        return [];
      },
      providesTags: ["Applications"],
    }),

    getJobApplications: builder.query({
      query: ({ jobId }) => ({
        url: `/applications/job/${jobId}`,
        method: "GET",
      }),
      providesTags: ["Applications"],
    }),
    updateApplicationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/applications/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Applications"],
    }),

    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `/applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Applications"],
    }),
    getEmployerApplications: builder.query({
      query: () => "/applications/employer",
      providesTags: ["Applications"],
    }),
    applyJob: builder.mutation({
      query: (body) => ({
        url: "/applications",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Applications", "Jobs"],
    }),
    getCandidateApplications: builder.query({
      query: () => "/applications/candidate",
      transformResponse: (response) => Array.isArray(response?.data) ? response.data : [],
      providesTags: ["Applications"],
    }),
   getApplicationById: builder.query({
  query: (id) => `/applications/employer/${id}`,
  providesTags: ["Application"],
}),

    shortlistApplication: builder.mutation({
      query: (applicationId) => ({
        url: `/applications/${applicationId}/shortlist`,
        method: "PATCH",

      }),
      invalidatesTags: ["Applications", "Application"],
    }),
    rejectApplication: builder.mutation({
      query: (applicationId) => ({
        url: `/applications/${applicationId}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: ["Applications", "Application"],
    }),
  }),
});

export const {
  useApplyJobMutation,
  useGetAllApplicationsQuery,
  useGetJobApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
  useGetEmployerApplicationsQuery,
  useGetCandidateApplicationsQuery,

  useGetApplicationByIdQuery,
  useShortlistApplicationMutation,
  useRejectApplicationMutation,
} = applicationsApi;
