import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  getAllUsers,
} from "./userController.js";
import { protect } from "../auth/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.get("/", protect, getAllUsers); // faqat adminlar uchun

export default router;
