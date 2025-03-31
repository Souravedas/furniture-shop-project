import express from "express";
import { getProfile, updateProfile, changePassword, updateLastSearch, uploadProfilePicture } from "../controllers/profileController.js";
import { protect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.put("/update-search", protect, updateLastSearch);
router.put("/upload-profile", protect, upload.single("image"), uploadProfilePicture); // ✅ New route for profile picture upload

export default router;