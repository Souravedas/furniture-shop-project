import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: String, unique: true },
		password: { type: String, required: true },
		profilePicture: { type: String, default: "" },
		lastSearchCategory: { type: String, default: "" },
		message: { type: String, default: "" },
		isAdmin: { type: Boolean, default: false },
		verified: { type: Boolean, default: false },
		verificationToken: { type: String },
		resetOtp: { type: Number, default: null },
		resetOtpExpires: { type: Date, default: null },

		// 🔹 New Reviews field
		reviews: [
			{
				content: { type: String, required: true },
				rating: { type: Number, min: 1, max: 5, required: true },
				createdAt: { type: Date, default: Date.now }
			}
		],
	},
	{ timestamps: true }
)

const User = mongoose.model("User", userSchema)
export default User