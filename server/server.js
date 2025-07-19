import express from "express";
import colors from "colors";
import dotenv from "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { mongoBDConnect } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHooks from "./controllers/clearkWebhook.js";

mongoBDConnect();

// initialization
const app = express();

// set middlewares
app.use(express.json());
app.use(clerkMiddleware());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3131",
    credentials: true,
  })
);

// set environment vars
const PORT = process.env.PORT || 9090;

app.use("/api/protected", clerkMiddleware());

// static folder
// app.use(express.static("public"));

// routing
app.post("/api/clerk", clerkWebHooks);
app.get("/", (req, res) => {
  res.send("Server is running");
});

// app listen
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`.bgGreen.black);
});
