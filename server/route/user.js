import express from "express";
import { protectAuth } from "../middlewares/authMiddleware.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", protectAuth, userController.getUserData);
router.post(
  "/store-recent-search",
  protectAuth,
  userController.storeRecentSearchCities
);

export default router;
