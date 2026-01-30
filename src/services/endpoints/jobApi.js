import { api } from "../api.js";

export const jobApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getActiveJob: builder.query({
      query: () => "/jobs/active",
      transformResponse: (response) =>
        Array.isArray(response?.data) ? response.data : [],
      providesTags: ["Jobs"],
    }),
    getAllJobs: builder.query({
      query: () => "/jobs",
      transformResponse: (response) =>
        Array.isArray(response?.data) ? response.data : [],
      providesTags: ["Jobs"],
    }),

    getJobById: builder.query({
      query: (id) => `/jobs/${id}`,
      transformResponse: (response) => response?.data,

      providesTags: ["  Job", "Application"],
    }),

    getMyJobs: builder.query({
      query: () => "/jobs/employer/my-jobs",
      transformResponse: (response) =>
        Array.isArray(response?.data) ? response.data : [],
      providesTags: ["Jobs"],
    }),

    createNewJob: builder.mutation({
      query: (data) => ({
        url: "/jobs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),

    updateJob: builder.mutation({
      query: ({ id, data }) => ({
        url: `/jobs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),

    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),

    approveJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Jobs"],
    }),

    rejectJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: ["Jobs"],
    }),

    blockJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["Jobs"],
    }),

    getSkillsByCategory: builder.query({
      query: (categoryId) => `/skills/category/${categoryId}`,
      transformResponse: (res) => (Array.isArray(res?.data) ? res.data : []),
      providesTags: ["Skills"],
    }),

    getCategories: builder.query({
      query: () => "/categories",
      transformResponse: (res) => (Array.isArray(res?.data) ? res.data : []),
      providesTags: ["Categories"],
    }),
    closeJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}/close`,
        method: "PATCH",
      }),
      invalidatesTags: ["Jobs"],
    }),
    getRecentJobs: builder.query({
      query: () => "/jobs/landing/recent",
      transformResponse: (response) =>
        Array.isArray(response?.data) ? response.data : [],
      providesTags: ["Jobs"],
    }),
    searchLandingJobs: builder.query({
      query: ({ keyword }) =>
        `/jobs/landing/search?keyword=${encodeURIComponent(keyword)}`,
      transformResponse: (res) => (Array.isArray(res?.data) ? res.data : []),
    }),
    getJobsForBoard: builder.query({
      query: (filters = {}) => {
        const params = new URLSearchParams();

        if (filters.search?.trim()) {
          params.append("search", filters.search.trim());
        }

        if (filters.location) {
          params.append("location", filters.location);
        }

        if (filters.type?.length) {
          params.append("type", filters.type.join(","));
        }
        if (filters.category?.length) {
          params.append("category", filters.category.join(","));
        }

        if (filters.experience?.length) {
          params.append("experience", filters.experience.join(","));
        }

        if (filters.posted) {
          params.append("posted", filters.posted);
        }

        return `/jobs/board?${params.toString()}`;
      },

      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const {
  useGetActiveJobQuery,
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useGetMyJobsQuery,

  useCreateNewJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,

  useApproveJobMutation,
  useRejectJobMutation,
  useBlockJobMutation,

  useGetSkillsByCategoryQuery,

  useGetCategoriesQuery,

  useCloseJobMutation,
  useGetRecentJobsQuery,
  useSearchLandingJobsQuery,
  useGetJobsForBoardQuery,
} = jobApi;
