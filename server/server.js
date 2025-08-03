import express from "express";
import colors from "colors";
import dotenv from "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { mongoBDConnect } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHooks from "./controllers/clearkWebhook.js";
import userRoute from "./route/user.js";
import hotelRoute from "./route/hotelRoute.js";
import roomRoute from "./route/roomRoute.js";
import bookingRoute from "./route/bookingRoute.js";

mongoBDConnect();

// initialization
const app = express();

// set middlewares
app.use(express.json());
app.use(clerkMiddleware());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3131",
      "https://hotel-booking-kappa-two.vercel.app/api/v1",
    ],
    credentials: true,
  })
);

// set environment vars
const PORT = process.env.PORT || 9090;

// static folder
app.use(express.static("public"));

// routing
app.use("/api/clerk", clerkWebHooks);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/hotel", hotelRoute);
app.use("/api/v1/room", roomRoute);
app.use("/api/v1/booking", bookingRoute);
app.get("/", (req, res) => {
  res.send("Server is running");
});

// app listen
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`.bgGreen.black);
});
