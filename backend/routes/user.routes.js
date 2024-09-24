import express from "express";
import {getProfile,updateProfile,} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/view", protectRoute, getProfile);
router.put("/edit", protectRoute, updateProfile);

export default router;
