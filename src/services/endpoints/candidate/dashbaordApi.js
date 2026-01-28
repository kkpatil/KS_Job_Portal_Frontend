import {api} from "../../api";

export const dashboardApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCandidateDashboard: builder.query({
            query: () => "/candidate/dashboard",

            providesTags: ["CandidateDashboard"],
        }),
        getRecentApplications: builder.query({
            query: () => '/candidate/dashboard/recent-applications',
            transformResponse: (response) => Array.isArray(response?.data) ? response.data : [],
            providesTags: ['Applications']
        }),
        getRecommendedJobs:builder.query({
            query: () => '/candidate/dashboard/recommended-jobs',
            transformResponse: (response) => Array.isArray(response?.data) ? response.data : [],
            providesTags: ['Jobs']
        })

    })
})

export const {
    useGetCandidateDashboardQuery,
    useGetRecentApplicationsQuery,
    useGetRecommendedJobsQuery
} = dashboardApi;