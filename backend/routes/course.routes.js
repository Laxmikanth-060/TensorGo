import express from "express";
import {
  createCourseWithDetails,
  getAllCourses,
  getCourseById,
  courseReview,
  getCourseReviews,
} from "../controllers/course.controller.js";

const router = express.Router();

router.post("/create-with-details", createCourseWithDetails);  //main-one
router.get("/", getAllCourses);
router.get("/:courseId", getCourseById);
router.post("/reviews",courseReview);
router.get("/:courseId/getreviews",getCourseReviews);
// router.get("/:courseId/modules", getModulesByCourseId);
// router.post("/:courseId/modules", createModuleForCourse);

export default router;
