import Furniture from "../models/FurnitureModel.js";
import express from "express";

const router = express.Router();
import {
  createFurniture,
  getAllFurniture,
  getFurnitureById,
  updateFurniture,
  deleteFurniture,
} from "../controllers/furnitureController.js";
import { protect } from "../middlewares/authMiddleware.js";

// Define routes for Furniture
router.route("/")
  .get(getAllFurniture) // List Furniture
  .post(protect, createFurniture); // Add Furniture

router.route("/:id")
  .get(getFurnitureById) // Get Single Furniture
  .put(protect, updateFurniture) // Update Furniture
  .delete(protect, deleteFurniture); // Delete Furniture


// Add a new furniture item
router.post("/", async (req, res) => {
  try {
    const { name, category, designer, imageUrl, purchaseLink } = req.body;
    const furniture = new Furniture({ name, category, designer, imageUrl, purchaseLink });
    await furniture.save();
    res.status(201).json(furniture);
  } catch (error) {
    res.status(500).json({ message: "Error adding furniture", error: error.message });
  }
});

// Get all furniture with filtering options (search, category, minPrice, maxPrice, designer)
router.get("/", async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, designer } = req.query;

    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" }; // Case-insensitive search for furniture name
    }

    if (designer) {
      filter.designer = { $regex: designer, $options: "i" }; // Case-insensitive search for designer name
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    const furniture = await Furniture.find(filter); // Find furniture with applied filters
    res.json(furniture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Search furniture by name or designer
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Query parameter is missing" });

    const furniture = await Furniture.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { designer: { $regex: query, $options: "i" } },
      ],
    });

    res.json(furniture);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
});


export default router;
