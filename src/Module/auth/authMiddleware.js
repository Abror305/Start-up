import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    // Token Header'dan olish: "Bearer <token>"
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "Token topilmadi, ruxsat berilmadi" });
    }

    // Tokenni verify qilish
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token noto'g'ri yoki muddati tugagan" });
  }
};