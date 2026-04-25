import Progress from "../models/progress.js";
import Lecture from "../models/lecture.js";

export const updateProgress = async (req, res) => {
  try {
    const { userId, courseId, lectureId } = req.body;

    // 1. Validate
    if (!userId || !courseId || !lectureId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Find or create progress
    let progress = await Progress.findOne({
      user: userId,
      course: courseId,
    });

    if (!progress) {
      progress = await Progress.create({
        user: userId,
        course: courseId,
        completedLectures: [],
        progressPercentage: 0,
      });
    }

    // 3. Avoid duplicate lecture completion
    if (!progress.completedLectures.includes(lectureId)) {
      progress.completedLectures.push(lectureId);
    }

    // 4. Get total lectures
    const totalLectures = await Lecture.countDocuments({
      course: courseId,
    });

    // 5. Calculate progress %
    const completedCount = progress.completedLectures.length;

    progress.progressPercentage =
      totalLectures === 0
        ? 0
        : Math.round((completedCount / totalLectures) * 100);

    await progress.save();

    res.status(200).json({
      message: "Progress updated",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
