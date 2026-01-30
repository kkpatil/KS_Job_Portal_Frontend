import { api } from "../api";

export const cmsApi = api.injectEndpoints({
  endpoints: (build) => ({

    /* ================= ADMIN ================= */

    // Get all CMS (pagination, filter, search)
    getCMSContents: build.query({
      query: (params) => ({
        url: "/cms",
        params,
      }),
      providesTags: ["CMS"],
    }),

    // Create CMS
    createCMS: build.mutation({
      query: (data) => ({
        url: "/cms",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CMS"],
    }),

    // Update CMS
    updateCMS: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/cms/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CMS"],
    }),

    // Soft delete CMS
    deleteCMS: build.mutation({
      query: (id) => ({
        url: `/cms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CMS"],
    }),

    /* ================= PUBLIC ================= */

    // Get CMS page by slug (About, Contact, Privacy)
    getCMSBySlug: build.query({
      query: (slug) => `/cms/${slug}`,
    }),

    

  }),
});

export const {
  useGetCMSContentsQuery,
  useCreateCMSMutation,
  useUpdateCMSMutation,
  useDeleteCMSMutation,
  useGetCMSBySlugQuery,
  
} = cmsApi;
