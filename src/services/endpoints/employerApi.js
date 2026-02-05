import { api } from "../api";

export const employerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL EMPLOYERS (ADMIN)
    getAllEmployers: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/employers?page=${page}&limit=${limit}`,
      providesTags: ["Employers"],
    }),

    getEmployerDashboard: builder.query({
      query: () => "/employers/dashboard",
      providesTags: ["EmployerDashboard"],
    }),

    // ADMIN: stats for a specific employer
    getEmployerStatsById: builder.query({
      query: (id) => `/employers/${id}/stats`,
      providesTags: (result, error, id) => [{ type: "EmployerStats", id }],
    }),

    getEmployerById: builder.query({
      query: (id) => `/employers/${id}`,
      providesTags: (result, error, id) => [{ type: "Employer", id }],
    }),

    // DELETE EMPLOYER
    deleteEmployer: builder.mutation({
      query: (id) => ({
        url: `/employers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employers"],
    }),

    // UPDATE EMPLOYER PROFILE (ADMIN)
    updateEmployer: builder.mutation({
      query: ({ id, data }) => ({
        url: `/employers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Employer", id },
        { type: "EmployerStats", id },
        "Employers",
        "EmployerDashboard",
      ],
    }),

    // COMPLETE EMPLOYER PROFILE (EMPLOYER)
    completeEmployerProfile: builder.mutation({
      query: (data) => ({
        url: "/employers/complete-profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employers"],
    }),

    // UPDATE EMPLOYER STATUS (ADMIN)
    updateEmployerStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/employers/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Employer", id },
        { type: "EmployerStats", id },
        "EmployerDashboard",
        "Employers",
      ],
    }),

    getProfile: builder.query({
      query: () => "/employers/profile",
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/employers/profile",
        method: "PUT",
        body: data,

      }),
      invalidatesTags: ["Profile"],

    }),
  }),
});

export const {
  useGetAllEmployersQuery,
  useDeleteEmployerMutation,
  useGetEmployerDashboardQuery,
  useGetEmployerStatsByIdQuery,
  useGetEmployerByIdQuery,
  useUpdateEmployerMutation,
  useUpdateEmployerStatusMutation,
  useCompleteEmployerProfileMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
} = employerApi;
