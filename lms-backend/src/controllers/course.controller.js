import Course from "../models/course.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, price, thumbnail } = req.body;

    // 1. Validate
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    // 2. Create course
    const course = await Course.create({
      title,
      description,
      price,
      thumbnail,
      // instructor will be added later (after auth)
    });

    // 3. Response
    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
