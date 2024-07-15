import { google } from "googleapis";
import fs from "fs";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../googleDriveKey.json"),
  scopes: ["https://www.googleapis.com/auth/drive"],
});

// TO UPLOAD THE FILES TO GOOGLE DRIVE
export const googleDriveUpload = async (req, res) => {
  try {
    //console.log(auth);

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

//TO CREATE A FOLDER
export const createFolder = async (req, res) => {
  console.log("Create Folder");
  try {
    const drive = google.drive({ version: "v3", auth });
    console.log(req.body);
    const fileMetadata = {
      name: req.body.folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: ["1TA-cBG3Ud5etD9a1Am4Uk7LkX4CzeH2u"],
    };

    const file = await drive.files.create({
      resource: fileMetadata,
      fields: "id",
    });

    res.status(200).json({ folderId: file.data.id });
  } catch (error) {
    console.error("Error creating folder:", error);
    res.status(500).send("An error occurred during folder creation.");
  }
};

//TO GET LIST OF VIDEOS/FILES FROM A FOLDER
export const listFilesInFolder = async (req, res) => {
  const folderId = req.params.folderId; // Get folder ID from request parameters
  try {
    const drive = google.drive({ version: "v3", auth });
    const response = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields:
        "files(id, name, mimeType, webViewLink, webContentLink, thumbnailLink)",
    });

    const files = response.data.files;
    res.status(200).json({ files });
  } catch (error) {
    console.error("Error listing files:", error);
    res.status(500).send("An error occurred while listing files.");
  }
};

//TO GET THE SPECIFIC FILE BASED ON THE FILE ID
export const getFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    // console.log("FILE ID :" + fileId);
    const drive = google.drive({ version: "v3", auth });
    const response = await drive.files.get(
      {
        fileId: fileId,
        alt: "media",
      },
      { responseType: "stream" }
    );

    response.data.pipe(res);
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).send("An error occurred while fetching the file.");
  }
};
