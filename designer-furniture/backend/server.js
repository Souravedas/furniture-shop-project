import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import furnitureRoutes from "./routes/furnitureRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import forgotPasswordRoutes from "./routes/forgotPasswordRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
import userRoutes from "./routes/userRoutes.js";

dotenv.config()

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }))
app.use(express.json({ limit: "10mb" }))
app.use("/api/auth", authRoutes)
app.use("/api/furniture", furnitureRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/auth", forgotPasswordRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/users", userRoutes);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error(err))

app.get("/", (req, res) => {
	res.send("API is running...")
})

const PORT = process.env.PORT || 5123
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
