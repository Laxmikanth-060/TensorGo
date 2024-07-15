import express from "express";
import multer from "multer";
import {
  createFolder,
  getFile,
  googleDriveUpload,
  listFilesInFolder,
} from "../controllers/googleDrive.js";

const router = express.Router();

const storage = multer.diskStorage({
  // destination: "uploads",
  filename: function (req, file, callback) {
    const extension = file.originalname.split(".").pop();
    callback(null, `${file.fieldname}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("files"), googleDriveUpload);
router.post("/create-folder", createFolder);
router.get("/list-files/:folderId", listFilesInFolder);
router.get("/file/:fileId", getFile);

export default router;
