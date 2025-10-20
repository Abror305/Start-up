import express from "express";
import { 
  registerUser, 
  loginUser, 
  getProfile, 
  getAllUsers 
} from "./user.controller.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", protect, getProfile);
router.get("/", protect, getAllUsers);

export default router;