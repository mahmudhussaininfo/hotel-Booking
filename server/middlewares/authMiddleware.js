import User from "../models/User.js";

export const protectAuth = async (req, res, next) => {
  const { userId } = req.auth;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    const user = await User.findById(userId);
    req.user = user;
    next();
  }
};
