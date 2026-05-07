import express from "express";
import {
  createLecture,
  getLecturesByCourse,
} from "../controllers/lecture.controller.js";

const router = express.Router();

router.post("/", createLecture);
router.get("/:courseId", getLecturesByCourse);

export default router;
