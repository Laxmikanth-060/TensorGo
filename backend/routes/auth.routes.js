import express from "express";
import {
  login,
  logout,
  signup,
  authCheck,
  emailVerification,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

router.get("/authCheck", protectRoute, authCheck);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/users/:id/verify/:token",emailVerification);

export default router;
