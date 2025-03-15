import asyncHandler from "express-async-handler";
import Furniture from "../models/FurnitureModel.js";

// @desc Get all furniture
// @route GET /api/furniture
// @access Public
const getAllFurniture = async (req, res) => {
  try {
    console.log("Received Query:", req.query); // Debugging log

    const { search, category, minPrice, maxPrice } = req.query;
    let filter = {};

    if (search) filter.name = { $regex: search, $options: "i" };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const furniture = await Furniture.find(filter);
    res.json(furniture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc Get single furniture item
// @route GET /api/furniture/:id
// @access Public
const getFurnitureById = asyncHandler(async (req, res) => {
  const furniture = await Furniture.findById(req.params.id);

  if (furniture) {
    res.json(furniture);
  } else {
    res.status(404);
    throw new Error("Furniture not found");
  }
});

// @desc Create new furniture (Admin only)
// @route POST /api/furniture
// @access Private
const createFurniture = asyncHandler(async (req, res) => {
  const { name, category, designer, price, image, description, purchaseLink } = req.body;

  const furniture = new Furniture({
    name,
    category,
    designer,
    price,
    image,
    description,
    purchaseLink,
  });

  const createdFurniture = await furniture.save();
  res.status(201).json(createdFurniture);
});

// @desc Update furniture (Admin only)
// @route PUT /api/furniture/:id
// @access Private
const updateFurniture = asyncHandler(async (req, res) => {
  const { name, category, designer, price, image, description, purchaseLink } = req.body;

  const furniture = await Furniture.findById(req.params.id);

  if (furniture) {
    furniture.name = name || furniture.name;
    furniture.category = category || furniture.category;
    furniture.designer = designer || furniture.designer;
    furniture.price = price || furniture.price;
    furniture.image = image || furniture.image;
    furniture.description = description || furniture.description;
    furniture.purchaseLink = purchaseLink || furniture.purchaseLink;

    const updatedFurniture = await furniture.save();
    res.json(updatedFurniture);
  } else {
    res.status(404);
    throw new Error("Furniture not found");
  }
});

// @desc Delete furniture (Admin only)
// @route DELETE /api/furniture/:id
// @access Private
const deleteFurniture = asyncHandler(async (req, res) => {
  const furniture = await Furniture.findById(req.params.id);

  if (furniture) {
    await furniture.deleteOne();
    res.json({ message: "Furniture removed" });
  } else {
    res.status(404);
    throw new Error("Furniture not found");
  }
});

export { getAllFurniture, getFurnitureById, createFurniture, updateFurniture, deleteFurniture };
