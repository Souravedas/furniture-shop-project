import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protect = async (req, res, next) => {
	try {
		let token = req.headers.authorization?.split(" ")[1]

		if (!token) {
			return res.status(401).json({ message: "Not authorized, no token" })
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.user = await User.findById(decoded.id).select("-password")

		if (!req.user) {
			return res.status(401).json({ message: "User not found" })
		}

		next()
	} catch (error) {
		return res.status(401).json({ message: "Token is invalid or expired" })
	}
}

// ✅ Add the missing `admin` middleware
export const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next()
	} else {
		return res.status(403).json({ message: "Not authorized as admin" })
	}
}

