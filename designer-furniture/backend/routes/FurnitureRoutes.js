import express from "express"
import { getFurniture, addFurniture, updateFurniture, deleteFurniture } from "../controllers/furnitureController.js"
import { protect, admin } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", getFurniture)
router.post("/", protect, admin, addFurniture)
router.put("/:id", protect, admin, updateFurniture)
router.delete("/:id", protect, admin, deleteFurniture)

export default router
