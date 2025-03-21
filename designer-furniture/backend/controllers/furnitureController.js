const Furniture = require("../models/Furniture");

// Get all furniture
exports.getFurniture = async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }

    const furniture = await Furniture.find(query);
    res.json(furniture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Add new furniture (Admin only)
exports.addFurniture = async (req, res) => {
  try {
    const { name, designer, category, description, price, image, link } = req.body;

    const newFurniture = new Furniture({ name, designer, category, description, price, image, link });
    await newFurniture.save();

    res.status(201).json({ message: "Furniture added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
