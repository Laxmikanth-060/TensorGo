import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import gDriveRoutes from "./routes/gdrive.routes.js";
import courseRoutes from './routes/course.routes.js';
import moduleRoutes from './routes/module.routes.js';
import userRoutes from './routes/user.routes.js';
import announcementsRoutes from './routes/announcements.routes.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 1234;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.cookie("cookieName", "cookieValue", {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  });
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/gDrive", gDriveRoutes);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use('/api/announcements', announcementsRoutes);
app.use('/courses', courseRoutes);
app.use('/modules', moduleRoutes);
app.use('/profile',userRoutes)
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}!`);
  connectMongoDB();
});



//https://www.devknus.com/course/tutorialreactminiprojects/reactminiprojects/11