import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // future use
    },
    price: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true },
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
