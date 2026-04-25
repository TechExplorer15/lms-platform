import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseDetails,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

// CREATE (only instructor)
router.post("/", authMiddleware, roleMiddleware("instructor"), createCourse);

// READ ALL (public)
router.get("/", getAllCourses);

// READ ONE (public)
router.get("/:courseId", getCourseDetails);

// UPDATE (only instructor)
router.put(
  "/:courseId",
  authMiddleware,
  roleMiddleware("instructor"),
  updateCourse,
);

// DELETE (only instructor)
router.delete(
  "/:courseId",
  authMiddleware,
  roleMiddleware("instructor"),
  deleteCourse,
);

export default router;
