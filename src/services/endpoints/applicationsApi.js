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
} = applicationsApi;
