import express from "express";
import { protectAuth } from "../middlewares/authMiddleware.js";
import * as roomController from "../controllers/roomController.js";
import { images } from "../utils/multer.js";

const router = express.Router();

router.post("/room-create", images, protectAuth, roomController.createRoom);
router.get("/rooms", roomController.getRooms);
router.get("/room-owner", protectAuth, roomController.getOwnerRooms);
router.post(
  "/room-toogle-availability",
  protectAuth,
  roomController.toggleRoomAvailability
);

export default router;
