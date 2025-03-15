import express from "express";
import { loginAdmin, registerAdmin, getAdminProfile } from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin); // Register admin
router.post("/login", loginAdmin); // Login admin
router.get("/profile", protect, getAdminProfile); // Get admin profile (protected route)

export default router;
