import User from "../models/User.js";
import sendEmail from "../helpers/emailHelper.js";
import bcrypt from "bcryptjs";

const otpStorage = {}; // Temporary storage for OTPs

// Send OTP Code to User Email
export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      console.log("Received forgot password request for email:", email); // ✅ Debugging log
  
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User not found for email:", email); // ✅ Debugging log
        return res.status(404).json({ message: "User not found" });
      }
  
      const otpCode = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
      otpStorage[email] = otpCode;
      console.log("Generated OTP:", otpCode); // ✅ Debugging log
  
      await sendEmail(email, "Password Reset Code", `Your OTP code is: ${otpCode}`);
      console.log("OTP sent successfully to:", email); // ✅ Debugging log
  
      res.json({ message: "OTP sent to your email" });
    } catch (error) {
      console.error("Forgot Password Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

// Verify OTP and Reset Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (otpStorage[email] !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  delete otpStorage[email]; // Remove OTP after reset
  res.json({ message: "Password reset successfully" });
};
