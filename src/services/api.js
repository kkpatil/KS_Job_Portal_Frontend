import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
   tagTypes: ["Employers", "Employer", "EmployerDashboard", "Applications", "Application","Jobs","  Job","Candidates","Candidate","CMS","Settings","Categories","Category","Skills","Skill","SavedJobs","SavedJobs", "Profile"],
  endpoints: () => ({}),
});
