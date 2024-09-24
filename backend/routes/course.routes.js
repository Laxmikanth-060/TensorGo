import express from "express";
import {
  createCourseWithDetails,
  getAllCourses,
  getCourseById,
} from "../controllers/course.controller.js";

import { enrollCourse } from "../controllers/course.enroll.js";
import { protectRoute } from "../middleware/protectRoute.js";


const router = express.Router();

router.post('/enroll',protectRoute,enrollCourse)
router.post("/create-with-details", createCourseWithDetails);  //main-one
router.get("/", getAllCourses);
router.get("/:courseId", getCourseById);

// router.get("/:courseId/modules", getModulesByCourseId);
// router.post("/:courseId/modules", createModuleForCourse);

export default router;
