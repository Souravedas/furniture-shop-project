import express from "express";
import Designer from "../models/DesignerModel.js";

const router = express.Router();

// Add a new designer
router.post("/", async (req, res) => {
  try {
    const { name, bio, website, furniture } = req.body;
    const designer = new Designer({ name, bio, website, furniture });
    await designer.save();
    res.status(201).json(designer);
  } catch (error) {
    res.status(500).json({ message: "Error adding designer", error: error.message });
  }
});

// Get all designers with their furniture
router.get('/', async (req, res) => {
    try {
        const designers = await Designer.find().populate('furniture'); // Populating linked furniture
        res.json(designers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search designers by name
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const designers = await Designer.find({ name: new RegExp(query, "i") }).populate("furniture");
    res.json(designers);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
});

export default router;
