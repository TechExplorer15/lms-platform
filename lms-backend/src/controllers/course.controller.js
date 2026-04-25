import {
  createCourseService,
  getAllCoursesService,
  getCourseDetailsService,
  updateCourseService,
  deleteCourseService,
} from "../services/course.service.js";

// CREATE
export const createCourse = async (req, res, next) => {
  try {
    const { title, description, price, thumbnail } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const course = await createCourseService({
      title,
      description,
      price,
      thumbnail,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    next(error);
  }
};

// READ ALL
export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await getAllCoursesService();

    res.status(200).json({
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    next(error);
  }
};

// READ ONE
export const getCourseDetails = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const data = await getCourseDetailsService(courseId);

    res.status(200).json({
      message: "Course details fetched",
      ...data,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updateCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const updatedCourse = await updateCourseService(courseId, req.body);

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    await deleteCourseService(courseId);

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
