import express from "express";
import {
  createCourseWithDetails,
  getAllCourses,
  getCourseById,
  getModulesByCourseId,
  createModuleForCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

router.post("/create-with-details", createCourseWithDetails);
router.get("/", getAllCourses);
router.get("/:courseId", getCourseById);
router.get("/:courseId/modules", getModulesByCourseId);
router.post("/:courseId/modules", createModuleForCourse);

export default router;
