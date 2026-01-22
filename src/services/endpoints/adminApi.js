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
  useGetRecentActivitiesQuery,
  useGetSystemAlertsQuery,
    useGetAllEmployersQuery,
} = adminApi;
