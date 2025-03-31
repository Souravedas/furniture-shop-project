import express from "express";
import { getFurniture, addFurniture, updateFurniture, deleteFurniture } from "../controllers/furnitureController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getFurniture); // ✅ Get all furniture
router.post("/", protect, admin, addFurniture); // ✅ Add new furniture
router.put("/:id", protect, admin, updateFurniture); // ✅ Update furniture
router.delete("/:id", protect, admin, deleteFurniture); // ✅ Delete furniture

export default router;
