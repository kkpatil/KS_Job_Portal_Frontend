import { api } from "../api";

export const EmployerDashboardApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getEmployerDashboard: builder.query({
            query: () => "/employers/dashboard",
           
            providesTags: ["EmployerDashboard"],
        }),
        getRecentEmployersJobs : builder.query({
            query: () => '/employers/dashboard/recent-jobs/emp',
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

export const { useGetEmployerDashboardQuery, useGetRecentEmployersJobsQuery, useGetRecentApplicationsQuery } = EmployerDashboardApi