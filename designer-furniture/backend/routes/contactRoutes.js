import express from "express"
import { submitContact } from "../controllers/contactController.js"
import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router()

// POST /api/contact/submit -> save message for authenticated user
router.post("/submit", protect, submitContact)

export default router