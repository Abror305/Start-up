  import express from "express";
  import dotenv from "dotenv";
  import cors from "cors";
  import connectDB from "./src/config/db.js";

  // 🔹 Module routes
  import userRoutes from "./src/Module/user/userRoutes.js";
  import productRoutes from "./src/Module/product/productRoutes.js";

  dotenv.config();

  const app = express();
  const PORT = process.env.PORT || 5000;

  // 🔹 Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 🔹 Database Connection
  connectDB();

  // 🔹 Routes
  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes);

  // 🔹 Root Route
  app.get("/", (req, res) => {
    res.json({ 
      message: "✅ Backend API ishlamoqda",
      endpoints: {
        users: "/api/users",
        products: "/api/products"
      }
    });
  });

  // 🔹 404 Handler
  app.use((req, res) => {
    res.status(404).json({ message: "❌ Route topilmadi" });
  });

  // 🔹 Error Handler
  app.use((err, req, res, next) => {
    console.error("⚠️ Error:", err.stack);
    res.status(500).json({ message: "Server xatolik yuz berdi", error: err.message });
  });

  // 🔹 Server Start
  app.listen(PORT, () => {
    console.log(`🚀 Server ${PORT} portda ishlamoqda`);
  });
