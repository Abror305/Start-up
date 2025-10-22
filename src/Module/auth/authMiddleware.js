import jwt from "jsonwebtoken";
import User from "../user/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Tokenni olish
      token = req.headers.authorization.split(" ")[1];

      // Tokenni tekshirish
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Foydalanuvchini topish
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Token yaroqsiz yoki muddati o'tgan" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Token topilmadi, avtorizatsiya kerak" });
  }
};
