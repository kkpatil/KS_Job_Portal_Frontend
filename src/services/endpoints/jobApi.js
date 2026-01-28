import { api } from "../api.js";

export const jobApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getActiveJob : builder.query({
        query: () => '/jobs/active',
        transformResponse: (response) => Array.isArray(response?.data) ? response.data : [],
        providesTags: ['Jobs']
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
  
  providesTags: ["  Job","Application"]
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
} = jobApi;
