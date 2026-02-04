import { api } from "../api";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query({
      query: () => "/admin/dashboard",
    }),
    getRecentActivities: builder.query({
      query: () => "/admin/recent-activities",
    }),

    getEmployers: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/admin/employers?page=${page}&limit=${limit}`,
    }),
    getCandidates: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) =>
        `/admin/candidates?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search,
        )}`,
      providesTags: ["Candidate"],
    }),
    getCandidateById: builder.query({
      query: (id) => `/admin/candidates/${id}`,
      providesTags: ["Candidate"],
    }),
    updateCandidate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/candidates/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Candidate"],
    }),
    deleteCandidate: builder.mutation({
      query: (id) => ({
        url: `/admin/candidates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Candidate"],
    }),
    getSystemAlerts: builder.query({
      query: () => "/admin/system-alerts",
    }),
    getAllEmployers: builder.query({
        query: (start = 1, last = 10) => `/admin/employers?page=${start}&limit=${last}`,
    })
  }),
});

export const {
  useGetAdminDashboardQuery,
  useGetEmployersQuery,
  useGetCandidatesQuery,
  useGetCandidateByIdQuery,
  useUpdateCandidateMutation,
  useDeleteCandidateMutation,
  useGetRecentActivitiesQuery,
  useGetSystemAlertsQuery,
    useGetAllEmployersQuery,
} = adminApi;
