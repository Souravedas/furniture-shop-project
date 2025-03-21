const express = require("express");
const { getFurniture, addFurniture } = require("../controllers/furnitureController"); // ✅ Import functions correctly
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getFurniture);
router.post("/", protect, admin, addFurniture); // ✅ Ensure this function exists

module.exports = router;
