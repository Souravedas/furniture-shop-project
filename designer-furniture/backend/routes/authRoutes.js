import express from "express"
import { loginUser, registerUser, verifyEmail } from "../controllers/authController.js"

const router = express.Router()

router.post("/login", loginUser)
router.post("/register", registerUser)
router.get("/verify-email/:token", verifyEmail)

export default router
