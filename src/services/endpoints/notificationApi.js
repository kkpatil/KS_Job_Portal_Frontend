// services/endpoints/notificationApi.js
import { api } from "../api";

export const notificationApi = api.injectEndpoints({
  endpoints: (build) => ({

    getMyNotifications: build.query({
      query: () => "/notifications",
      providesTags: ["Notification"]
    }),

    getUnreadCount: build.query({
      query: () => "/notifications/unread-count"
    }),

    markAsRead: build.mutation({
      query: (id) => ({
        url: `/notifications/read/${id}`,
        method: "PUT"
      }),
      invalidatesTags: ["Notification"]
    }),

    markAllAsRead: build.mutation({
      query: () => ({
        url: "/notifications/read-all",
        method: "PUT"
      }),
      invalidatesTags: ["Notification"]
    }),

  })
});

export const {
  useGetMyNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation
} = notificationApi;
