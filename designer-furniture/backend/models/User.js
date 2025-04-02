import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    lastSearchCategory: { type: String },
    isAdmin: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetOtp: { type: Number, default: null },
    resetOtpExpires: {type: Date, default: null},
  },
  { timestamps: true }
)

const User = mongoose.model("user", userSchema)
export default User
