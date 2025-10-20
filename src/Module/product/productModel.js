import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Mahsulot nomi kiritish majburiy"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Narx kiritish majburiy"],
      min: [0, "Narx 0 dan kichik bo'lishi mumkin emas"],
    },
    description: {
      type: String,
      required: [true, "Tavsif kiritish majburiy"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Kategoriya kiritish majburiy"],
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, "Miqdor 0 dan kichik bo'lishi mumkin emas"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model("Product", productSchema);