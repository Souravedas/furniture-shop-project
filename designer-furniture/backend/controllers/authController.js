import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import crypto from "crypto"
import dotenv from "dotenv"

dotenv.config()

// Email Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 🔹 REGISTER USER & SEND VERIFICATION EMAIL
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered" })

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString("hex")

        // Create new user (Unverified)
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            verified: false,
            verificationToken,
        })

        await newUser.save()

        // Send verification email
        const verificationUrl = `${process.env.CLIENT_URL}/api/auth/verify-email/${verificationToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Email",
            html: `<h2>Welcome, ${name}!</h2>
                   <p>Click the link below to verify your email:</p>
                   <a href="${verificationUrl}">Click this link to verify.</a>
                   <p>If you didn’t request this, ignore this email.</p>`,
        })

        res.status(200).json({ message: "Verification email sent. Check your inbox." })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" })
    }
}

// 🔹 VERIFY EMAIL
export const verifyEmail = async (req, res) => {
  try {
      const user = await User.findOne({ verificationToken: req.params.token })

      if (!user) return res.status(400).json({ message: "Invalid or expired token" })

      // Mark user as verified properly
      await User.updateOne(
        { verificationToken: req.params.token }, 
        { $set: { verified: true, verificationToken: null } }
      )

      // Redirect to a success page on the frontend
      res.redirect(`${process.env.CLIENT_URL}/verify-email-success`)
      
  } catch (error) {
      console.error("Email verification error:", error)
      res.status(500).json({ message: "Server error" })
  }
}


// 🔹 LOGIN USER (PREVENT UNVERIFIED USERS FROM LOGGING IN)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "Invalid email or password" })

    // Check if email is verified
    if (!user.verified) return res.status(400).json({ message: "Email not verified. Please check your email." })

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" })

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        isAdmin: user.isAdmin,
        profilePicture: user.profilePicture || "",
      } 
    })
    
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}