import express from "express";
import { 
  registerUser, 
  loginUser, 
  getProfile, 
  getAllUsers 
} from "./userController.js";
import { protect } from "../auth/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", protect, getProfile);
router.get("/", protect, getAllUsers);
//hellooo

export default router;