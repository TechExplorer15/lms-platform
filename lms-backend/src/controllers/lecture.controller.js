import Lecture from "../models/lecture.js";

export const createLecture = async (req, res) => {
  try {
    const { title, videoUrl, courseId, order } = req.body;

    // 1. Validate
    if (!title || !videoUrl || !courseId || order === undefined) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Create lecture
    const lecture = await Lecture.create({
      title,
      videoUrl,
      course: courseId,
      order,
    });

    res.status(201).json({
      message: "Lecture created successfully",
      lecture,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
