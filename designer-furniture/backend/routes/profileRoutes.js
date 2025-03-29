const express = require("express");
const { 
    getProfile, 
    updateProfile, 
    changePassword, 
    updateLastSearch, 
    uploadProfilePicture 
} = require("../controllers/profileController");

const { protect } = require("../middlewares/authMiddleware");
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.put("/update-search", protect, updateLastSearch);
router.put("/upload-profile", protect, upload.single("image"), uploadProfilePicture); // ✅ New route for profile picture upload

module.exports = router;
