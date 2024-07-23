import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import gDriveRoutes from "./routes/gdrive.routes.js";
import Razorpay from "razorpay";
import payment from "./routes/payment.js"

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
app.use("/api/payment",payment)
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


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}!`);
  connectMongoDB();
});
