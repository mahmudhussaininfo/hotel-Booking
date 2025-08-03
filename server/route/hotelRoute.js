import express from "express";
import { protectAuth } from "../middlewares/authMiddleware.js";
import * as hotelController from "../controllers/hotelController.js";

const router = express.Router();

router.post("/hotel-create", protectAuth, hotelController.regiserHotel);

export default router;
