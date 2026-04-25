import express from "express";
import { createLecture } from "../controllers/lecture.controller.js";

const router = express.Router();

router.post("/", createLecture);

export default router;
