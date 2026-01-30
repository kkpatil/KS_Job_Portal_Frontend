import { api } from "../api";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL CATEGORIES
    getAllCategories: builder.query({
  query: () => "/categories",
  transformResponse: (response) =>
    Array.isArray(response?.data) ? response.data : [],
  providesTags: ["Categories"],
}),


    // CREATE
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // UPDATE
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // DELETE
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
    getLandingCategories: builder.query({
      query: () => '/categories/landing',
      method: "GET",
      providesTags: ["Categories"],
    })
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetLandingCategoriesQuery,
} = categoryApi;
