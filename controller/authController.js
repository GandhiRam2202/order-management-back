import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOtp } from "../middleware/sendOtp.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};



export const login = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      role: user.role
    }
  });

};

/* ================= FORGOT PASSWORD ================= */

export const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpire = otpExpire;

    await user.save();

    await sendOtp(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otpExpire,
    });

  } catch (err) {

    console.error("Forgot password error:", err);

    return res.status(500).json({
      message: "Failed to send OTP",
    });

  }
};



/* ================= RESET PASSWORD ================= */

export const resetPassword = async (req, res) => {

  try {

    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check OTP match
    if (String(user.otp) !== String(otp)) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Check OTP expiry
    if (!user.otpExpire || user.otpExpire.getTime() < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // Clear OTP
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });

  } catch (err) {

    console.error("RESET PASSWORD ERROR:", err);

    return res.status(500).json({
      message: "Password reset failed",
    });

  }

};