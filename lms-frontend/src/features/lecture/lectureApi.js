import { apiSlice } from "@/services/apiSlice";

export const lectureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLectures: builder.query({
      query: (courseId) => `/lectures/${courseId}`,
    }),

    markComplete: builder.mutation({
      query: ({ lectureId, userId }) => ({
        url: "/progress",
        method: "POST",
        body: { lectureId, userId },
      }),
    }),
  }),
});

export const { useGetLecturesQuery, useMarkCompleteMutation } = lectureApi;
