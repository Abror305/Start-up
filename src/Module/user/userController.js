import jwt from "jsonwebtoken";
import User from "./user.model.js";

// JWT token yaratish
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// 🔹 Register - Yangi foydalanuvchi ro'yxatdan o'tkazish
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validatsiya
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Barcha maydonlarni to'ldiring" });
    }

    // Foydalanuvchi mavjudligini tekshirish
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Bu email allaqachon ro'yxatdan o'tgan" });
    }

    // Yangi foydalanuvchi yaratish
    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Ro'yxatdan o'tishda xatolik", 
      error: error.message 
    });
  }
};

// 🔹 Login - Tizimga kirish
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validatsiya
    if (!email || !password) {
      return res.status(400).json({ message: "Email va parolni kiriting" });
    }

    // Foydalanuvchini topish
    const user = await User.findOne({ email });

    // Parolni tekshirish
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({ message: "Email yoki parol noto'g'ri" });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Tizimga kirishda xatolik", 
      error: error.message 
    });
  }
};

// 🔹 Get Profile - Token orqali foydalanuvchi ma'lumotini olish
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Ma'lumot olishda xatolik", 
      error: error.message 
    });
  }
};

// 🔹 Get All Users - Barcha foydalanuvchilarni olish
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Foydalanuvchilarni olishda xatolik", 
      error: error.message 
    });
  }
};