import express from "express";
import { protectAuth } from "../middlewares/authMiddleware.js";
import * as bookingController from "../controllers/bookingController.js";

const router = express.Router();

router.post("/check-availability", bookingController.checkAvailabilityApi);
router.post("/create-booking", protectAuth, bookingController.createBooking);
router.post(
  "/update-booking",
  protectAuth,
  bookingController.updateBookingStatus
);
router.get("/user-booking", protectAuth, bookingController.getUsersBookings);
router.get("/hotel-booking", protectAuth, bookingController.getHotelBookings);

export default router;
