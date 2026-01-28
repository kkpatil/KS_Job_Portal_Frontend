import { api } from "../api";

export const cmsApi = api.injectEndpoints({
  endpoints: (build) => ({

    /* ================= ADMIN ================= */

    // Get all CMS (pagination, filter, search)
    getCMSContents: build.query({
      query: (params) => ({
        url: "/cms/admin",
        params,
      }),
      providesTags: ["CMS"],
    }),

    // Create CMS
    createCMS: build.mutation({
      query: (data) => ({
        url: "/cms/admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CMS"],
    }),

    // Update CMS
    updateCMS: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/cms/admin/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CMS"],
    }),

    // Soft delete CMS
    deleteCMS: build.mutation({
      query: (id) => ({
        url: `/cms/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CMS"],
    }),

    /* ================= PUBLIC ================= */

    // Get CMS page by slug (About, Contact, Privacy)
    getCMSPageBySlug: build.query({
      query: (slug) => `/cms/page/${slug}`,
    }),

    // Get all blogs
    getBlogs: build.query({
      query: () => "/cms/blogs",
    }),

    // Get blog detail by slug
    getBlogBySlug: build.query({
      query: (slug) => `/cms/blog/${slug}`,
    }),

  }),
});

export const {
  useGetCMSContentsQuery,
  useCreateCMSMutation,
  useUpdateCMSMutation,
  useDeleteCMSMutation,
  useGetCMSPageBySlugQuery,
  useGetBlogsQuery,
  useGetBlogBySlugQuery,
} = cmsApi;
