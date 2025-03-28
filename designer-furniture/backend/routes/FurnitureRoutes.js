const express = require("express");
const { getFurniture, addFurniture, updateFurniture, deleteFurniture } = require("../controllers/furnitureController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getFurniture); // ✅ Get all furniture
router.post("/", protect, admin, addFurniture); // ✅ Add new furniture
router.put("/:id", protect, admin, updateFurniture); // ✅ Update furniture
router.delete("/:id", protect, admin, deleteFurniture); // ✅ Delete furniture

module.exports = router;
