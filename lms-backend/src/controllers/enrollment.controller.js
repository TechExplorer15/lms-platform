import Enrollment from "../models/enrollment.js";

export const enrollCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // 1. Validate
    if (!userId || !courseId) {
      return res.status(400).json({
        message: "UserId and CourseId are required",
      });
    }

    // 2. Check existing enrollment
    const existing = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already enrolled in this course",
      });
    }

    // 3. Create enrollment
    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};