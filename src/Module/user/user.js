import express from "express";
import { registerUser, loginUser, getUsers } from "./user.controller.js";

const router = express.Router();

// 🔹 Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);

export default router;
