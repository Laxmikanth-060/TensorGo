import express, { urlencoded } from "express";
import authRoutes from "./routes/auth.routes.js";
import gDriveRoutes from "./routes/gdrive.routes.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { googleDriveUpload } from "./controllers/googleDrive.js";

const app = express();
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 1234;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/gDrive", gDriveRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}!`);
  connectMongoDB();
});
