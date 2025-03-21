const express = require("express");
const { getProfile, updateProfile, changePassword, updateLastSearch } = require("../controllers/profileController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.put("/update-search", protect, updateLastSearch);

module.exports = router;
