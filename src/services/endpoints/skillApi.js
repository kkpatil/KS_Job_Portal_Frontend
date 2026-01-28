import { api } from "../api";

export const skillApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ADMIN: skills + job count
    getAdminSkills: builder.query({
      query: () => "/skills/admin",
      transformResponse: (res) => res.data,
      providesTags: ["Skills"],
    }),

    createSkill: builder.mutation({
      query: (data) => ({
        url: "/skills",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Skills"],
    }),

    updateSkill: builder.mutation({
      query: ({ id, data }) => ({
        url: `/skills/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Skills"],
    }),

    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skills"],
    }),
  }),
});

export const {
  useGetAdminSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillApi;
