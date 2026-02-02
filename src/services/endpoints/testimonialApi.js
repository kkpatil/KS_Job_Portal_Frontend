import { api } from "../api";

// RTK Query testimonial endpoints
export const testimonialApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTestimonials: builder.query({
      query: () => "/testimonials/all",
      providesTags: ["Testimonial"],
    }),
    getTestimonialById: builder.query({
      query: (id) => `/testimonials/${id}`,
      providesTags: ["Testimonial"],
    }),
    createTestimonial: builder.mutation({
      query: (data) => ({
        url: "/testimonials/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Testimonial"],
    }),
    updateTestimonial: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/testimonials/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Testimonial"],
    }),
    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/testimonials/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Testimonial"],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for component usage
export const {
  useGetAllTestimonialsQuery,
  useGetTestimonialByIdQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = testimonialApi;
