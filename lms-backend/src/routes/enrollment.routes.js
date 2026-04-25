import express from "express";
import { enrollCourse } from "../controllers/enrollment.controller.js";

const router = express.Router();

router.post("/", enrollCourse);

export default router;
