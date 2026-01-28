import { api } from "../api";

export const EmployerDashboardApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getEmployerDashboard: builder.query({
            query: () => "/employers/dashboard",
           
            providesTags: ["EmployerDashboard"],
        }),
        getRecentJobs : builder.query({
            query: () => '/employers/dashboard/recent-jobs',
            transformResponse: (response) => Array.isArray(response?.data) ? response.data : [],
            providesTags: ['Jobs']
        })
        ,getRecentApplications : builder.query({
            query: () => '/employers/dashboard/recent-applications',
            transformResponse: (response) => Array.isArray(response?.data) ? response.data : [],
            providesTags: ['Applications']
        })
    })
})

export const { useGetEmployerDashboardQuery, useGetRecentJobsQuery, useGetRecentApplicationsQuery } = EmployerDashboardApi