import express from "express";
import {
  courseReview,
  createCourseWithDetails,
  getAllCourses,
  getCourseById,
  getUserProgress,
  markVideoAsCompleted,
  getCourseReviews,
} from "../controllers/course.controller.js";

import { enrollCourse } from "../controllers/course.enroll.js";
import { protectRoute } from "../middleware/protectRoute.js";


const router = express.Router();

router.post('/enroll',protectRoute,enrollCourse)
router.post("/create-with-details", createCourseWithDetails);  //main-one
router.get("/", getAllCourses);
router.get("/:courseId", getCourseById);
router.get("/progress/:courseId/:userId", getUserProgress);
router.post("/complete-video", markVideoAsCompleted);
router.post("/reviews",courseReview);
router.get("/:courseId/getreviews",getCourseReviews);

// router.get("/:courseId/modules", getModulesByCourseId);
// router.post("/:courseId/modules", createModuleForCourse);

export default router;
