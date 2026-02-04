import {api} from "../../api"

export const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCandidateProfile: builder.query({
            query: () => `/candidate/profile`,
        }),
        updateCandidateProfile: builder.mutation({
            query: (data) => ({
                url: `/candidate/profile`,
                method: "PUT",
                body: data,
            }),

        }),
        uploadResume: builder.mutation({
      query: (formData) => ({
        url: "/candidate/profile/resume",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),
    complateCandidateProfile:builder.mutation({
      query: (data) => ({
        url: `/candidate/profile-complete`,
        method: "PUT",
        body: data,
      }),
    })
    }),
})

export const {useGetCandidateProfileQuery, useUpdateCandidateProfileMutation, useUploadResumeMutation, useComplateCandidateProfileMutation} = profileApi;