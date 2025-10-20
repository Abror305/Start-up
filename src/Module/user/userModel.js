import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ism kiritish majburiy"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email kiritish majburiy"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Parol kiritish majburiy"],
      minlength: [6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"],
    },
  },
  { 
    timestamps: true 
  }
);

// Parolni saqlashdan oldin hash qilish
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Parolni tekshirish uchun metod
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);