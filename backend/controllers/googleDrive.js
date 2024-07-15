import { google } from "googleapis";
import fs from "fs";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const googleDriveUpload = async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, "../googleDriveKey.json"),
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    console.log("Backend");
    console.log(auth);

    const drive = google.drive({ version: "v3", auth });

    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      const response = await drive.files.create({
        // responsible to create file in drive
        requestBody: {
          name: file.originalname, // name of the file to be uploaded in drive, this will also be the name of the file once it is downloaded from drive.
          mimeType: file.mimeType, // refers to the extension
          parents: ["1TA-cBG3Ud5etD9a1Am4Uk7LkX4CzeH2u"], // the G drive folder id where the videos need to be stored
        },
        media: {
          body: fs.createReadStream(file.path),
        },
      });

      uploadedFiles.push(response.data);
    }
    res.json({ files: uploadedFiles });
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send("An error occurred during file upload.");
  }
};
