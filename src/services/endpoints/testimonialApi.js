import { api } from "../api";

export const testimonialApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL
    getAllTestimonials: builder.query({
      query: () => "/testimonials/all",
      transformResponse: (response) => response.data || [],
      providesTags: ["Testimonial"],
    }),
    // GET BY ID
    getTestimonialById: builder.query({
      query: (id) => `/testimonials/${id}`,
      providesTags: ["Testimonial"],
    }),

    // CREATE
    createTestimonial: builder.mutation({
      query: (formData) => ({
        url: "/testimonials/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Testimonial"],
    }),

    // UPDATE
    updateTestimonial: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/testimonials/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Testimonial"],
    }),

    // DELETE
    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/testimonials/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Testimonial"],
    }),
  }),
});

export const {
  useGetAllTestimonialsQuery,
  useGetTestimonialByIdQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = testimonialApi;
