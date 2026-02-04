import { api } from "../api"; // your api.js file

export const newsBlogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => "/news-blog/all", // GET all news/blogs
      transformResponse: (response) =>
        Array.isArray(response?.data) ? response.data : [],
      providesTags: ["NewsBlog"],
    }),
    getNewsById: builder.query({
      query: (id) => `/news-blog/${id}`, // GET single news/blog
      providesTags: ["NewsBlog"],
    }),
    createNews: builder.mutation({
      query: (formData) => ({
        url: "/news-blog/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["NewsBlog"],
    }),
    updateNews: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/news-blog/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["NewsBlog"],
    }),
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/news-blog/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NewsBlog"],
    }),
  }),
  overrideExisting: false,
});

// ===== Export hooks =====
export const {
  useGetNewsQuery,
  useGetNewsByIdQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsBlogApi;
