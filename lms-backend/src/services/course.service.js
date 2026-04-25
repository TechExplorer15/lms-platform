import Course from "../models/course.js";
import Lecture from "../models/lecture.js";

// CREATE
export const createCourseService = async (data) => {
  return await Course.create(data);
};

// READ ALL
export const getAllCoursesService = async () => {
  return await Course.find().sort({ createdAt: -1 });
};

// READ ONE (DETAILS)
export const getCourseDetailsService = async (courseId) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  const lectures = await Lecture.find({ course: courseId }).sort({ order: 1 });

  return { course, lectures };
};

// UPDATE
export const updateCourseService = async (courseId, data) => {
  const course = await Course.findByIdAndUpdate(courseId, data, { new: true });

  if (!course) {
    throw new Error("Course not found");
  }

  return course;
};

// DELETE
export const deleteCourseService = async (courseId) => {
  const course = await Course.findByIdAndDelete(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  // Optional: also delete related lectures
  await Lecture.deleteMany({ course: courseId });

  return course;
};
