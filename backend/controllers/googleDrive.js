import multer from "multer";
import { google } from "googleapis";
import fs from "fs";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, callback) {
    const extension = file.originalname.split(".").pop();
    callback(null, `${file.fieldname}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage });

export const googleDriveUpload = upload.array("files", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "../googleDriveKey.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    console.log(auth);

    const drive = google.drive({ version: "v3", auth });

    const fileUploads = req.files.map((file) => {
      const fileMetadata = {
        name: file.originalname,
      };
      const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
      };

      return drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id",
      });
    });

    const results = await Promise.all(fileUploads);
    const fileIds = results.map((result) => result.data.id);

    res.status(200).json({ fileIds });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during file upload.");
  }
});
