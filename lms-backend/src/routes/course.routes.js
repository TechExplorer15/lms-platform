import express from "express";
import { createCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.post("/", createCourse);

export default router;
