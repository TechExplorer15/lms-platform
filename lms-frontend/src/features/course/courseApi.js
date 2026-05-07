import { apiSlice } from "@/services/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all courses
    getCourses: builder.query({
      query: () => "/courses",
    }),

    // Get course by ID
    getCourseById: builder.query({
      query: (id) => `/courses/${id}`,
    }),

    // Enroll course
    enrollCourse: builder.mutation({
      query: ({ courseId, userId }) => ({
        url: "/enrollments",
        method: "POST",
        body: { courseId, userId },
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useEnrollCourseMutation,
} = courseApi;
