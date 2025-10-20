import Product from "./product.model.js";

// 🔹 CREATE - Yangi mahsulot qo'shish
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, inStock, quantity } = req.body;

    // Validatsiya
    if (!name || !price || !description || !category) {
      return res.status(400).json({ 
        message: "Name, price, description va category majburiy" 
      });
    }

    // Yangi mahsulot yaratish
    const product = await Product.create({
      name,
      price,
      description,
      category,
      inStock,
      quantity,
      createdBy: req.user.id, // Token'dan olingan user ID
    });

    res.status(201).json({
      success: true,
      message: "Mahsulot muvaffaqiyatli qo'shildi",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Mahsulot qo'shishda xatolik", 
      error: error.message 
    });
  }
};

// 🔹 READ - Barcha mahsulotlarni olish
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Mahsulotlarni olishda xatolik", 
      error: error.message 
    });
  }
};

// 🔹 READ - Bitta mahsulotni ID orqali olish
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("createdBy", "name email");

    if (!product) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Mahsulot olishda xatolik", 
      error: error.message 
    });
  }
};

// 🔹 UPDATE - Mahsulotni yangilash
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, inStock, quantity } = req.body;

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }

    // Faqat mahsulot yaratuvchisi o'zgartirishi mumkin
    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ 
        message: "Siz bu mahsulotni o'zgartirish huquqiga ega emassiz" 
      });
    }

    // Mahsulotni yangilash
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, inStock, quantity },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Mahsulot muvaffaqiyatli yangilandi",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Mahsulot yangilashda xatolik", 
      error: error.message 
    });
  }
};

// 🔹 DELETE - Mahsulotni o'chirish
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }

    // Faqat mahsulot yaratuvchisi o'chirishi mumkin
    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ 
        message: "Siz bu mahsulotni o'chirish huquqiga ega emassiz" 
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Mahsulot muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Mahsulot o'chirishda xatolik", 
      error: error.message 
    });
  }
};