import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Barcha mahsulotlar route'lari protected (token kerak)
router.post("/", protect, createProduct);
router.get("/", protect, getAllProducts);
router.get("/:id", protect, getProductById);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;