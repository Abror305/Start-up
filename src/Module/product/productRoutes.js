import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./productController.js";
import { protect } from "../auth/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProduct);
router.get("/", protect, getAllProducts);
router.get("/:id", protect, getProductById);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;