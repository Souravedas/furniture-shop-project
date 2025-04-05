import User from "../models/User.js";
import sendEmail from "../helpers/emailHelper.js";
import bcrypt from "bcryptjs";



// Send OTP Code to User Email
export const forgotPassword = async (req, res) => {
	const otpExpiryTime = 1000000;
	try {
		const { email } = req.body;
		// console.log("Received forgot password request for:", email);

		const user = await User.findOne({ email });
		if (!user) {
			// console.log("User not found for email:", email);
			return res.status(404).json({ message: "User not found" });
		}

		// Generate a secure OTP
		const otpCode = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
		const otpExpiry = Date.now() + otpExpiryTime; // Expiration time

		// Store OTP in the database
		user.resetOtp = otpCode;
		user.resetOtpExpires = otpExpiry;
		await user.save();

		// Send OTP to the user's email
		await sendEmail(email, "Password Reset Code", `Your OTP code is: ${otpCode}`);
		// console.log("OTP sent successfully to:", email);

		res.json({ message: "✅ OTP sent to your email." });
	} catch (error) {
		// console.error("Forgot Password Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Verify OTP and Reset Password
export const resetPassword = async (req, res) => {
	try {
		//   console.log("Received reset password request:", req.body); // ✅ Debugging log

		const { email, otp, newPassword } = req.body;

		if (!email || !otp || !newPassword) {
			//   console.log("Missing fields:", { email, otp, newPassword }); // ✅ Debugging log
			return res.status(400).json({ message: "⚠️ All fields are required." });
		}

		const user = await User.findOne({ email });
		if (!user) {
			//   console.log("User not found for email:", email);
			return res.status(404).json({ message: "User not found" });
		}

		//   console.log("Stored OTP:", user.resetOtp, "Received OTP:", otp); // ✅ Debugging log

		if (!user.resetOtp || !user.resetOtpExpiry || Date.now() > user.resetOtpExpiry) {
			//   console.log("OTP Expired or Invalid");
			return res.status(400).json({ message: "⚠️ OTP expired. Please request a new one." });
		}

		if (Number(user.resetOtp) !== Number(otp)) {
			//   console.log("Invalid OTP entered");
			return res.status(400).json({ message: "⚠️ Invalid OTP." });
		}

		// Hash the new password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(newPassword, salt);

		// Clear OTP fields
		user.resetOtp = null;
		user.resetOtpExpiry = null;
		await user.save();

		//   console.log("✅ Password reset successfully!");
		res.json({ message: "✅ Password reset successfully!" });
	} catch (error) {
		//   console.error("Reset Password Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
