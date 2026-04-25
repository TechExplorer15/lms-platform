import express from "express";
import { updateProgress } from "../controllers/progress.controller.js";

const router = express.Router();

router.post("/", updateProgress);

export default router;
