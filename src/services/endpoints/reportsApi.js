import {api } from "../api"
export const reportsApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // SUMMARY
   getSummary: builder.query({
  query: () => "/reports/summary",
  transformResponse: (res) => res?.data || {},
}),


    // CHART: APPLICATION TREND
    getApplicationTrend: builder.query({
      query: () => "/reports/applications-trend",
      transformResponse: (res) => res?.data ?? [],
    }),

    // CHART: JOBS BY SKILL
    getJobsBySkill: builder.query({
      query: () => "/reports/jobs-by-skill",
      transformResponse: (res) => res?.data ?? [],
    }),

    // TABLE: JOBS
    getJobsReport: builder.query({
      query: () => "/reports/jobs",
      transformResponse: (res) =>
        Array.isArray(res?.data) ? res.data : [],
    }),

    // ✅ TABLE: APPLICATIONS (FIXED)
    getApplicationsReport: builder.query({
      query: () => "/reports/applications-list",
      transformResponse: (res) =>
        Array.isArray(res?.data) ? res.data : [],
    }),

    // REPORTS LIST
    getReportsList: builder.query({
      query: () => "/reports/list",
      transformResponse: (res) =>
        Array.isArray(res?.data) ? res.data : [],
    }),

  }),
});

export const {
  useGetSummaryQuery,
  useGetApplicationTrendQuery,
  useGetJobsBySkillQuery,
  useGetJobsReportQuery,
  useGetApplicationsReportQuery,
  useGetReportsListQuery,
} = reportsApi;