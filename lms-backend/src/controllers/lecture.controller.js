import Lecture from "../models/lecture.js";

// ✅ CREATE LECTURE
export const createLecture = async (req, res) => {
  try {
    const { title, videoUrl, course } = req.body;

    if (!title || !videoUrl || !course) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const lecture = await Lecture.create({
      title,
      videoUrl,
      course,
    });

    res.status(201).json({
      message: "Lecture created successfully",
      lecture,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create lecture",
    });
  }
};

// ✅ GET LECTURES
export const getLecturesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const lectures = await Lecture.find({ course: courseId });

    res.json({ lectures });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch lectures" });
  }
};
