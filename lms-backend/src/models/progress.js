import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    progressPercentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Prevent duplicate progress records per user-course
progressSchema.index({ user: 1, course: 1 }, { unique: true });

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
