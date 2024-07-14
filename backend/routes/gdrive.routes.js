import express from "express";

import { googleDriveUpload } from "../controllers/googleDrive.js";
const router = express.Router();

router.post("/upload", googleDriveUpload);

export default router;
