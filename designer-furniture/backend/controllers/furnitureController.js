import Furniture from "../models/Furniture.js";

// Get all furniture
export const getFurniture = async (req, res) => {
  try {
    const { category } = req.query;
    let furniture;

    if (category && category !== "all") {
      const formattedCategory = category.replace(/_/g, " ");
      furniture = await Furniture.find({ category: formattedCategory }); 
    } else {
      furniture = await Furniture.find();
    }
    res.json(furniture);
  } catch (error) {
    console.error("Error fetching furniture:", error);
    res.status(500).json({ message: "Error fetching furniture" });
  }
};


// Add new furniture (Admin only)
export const addFurniture = async (req, res) => {
  try {
    const { name, designer, category, description, price, image, link } = req.body;

    const newFurniture = new Furniture({ name, designer, category, description, price, image, link });
    await newFurniture.save();

    res.status(201).json({ message: "Furniture added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update furniture (Admin only)
export const updateFurniture = async (req, res) => {
  try {
    const { name, designer, category, description, price, image, link } = req.body;
    const { id } = req.params; // ✅ Get furniture ID from URL

    const furniture = await Furniture.findById(id);
    if (!furniture) {
      return res.status(404).json({ message: "Furniture not found" });
    }

    // ✅ Update the furniture details
    furniture.name = name || furniture.name;
    furniture.designer = designer || furniture.designer;
    furniture.category = category || furniture.category;
    furniture.description = description || furniture.description;
    furniture.price = price || furniture.price;
    furniture.image = image || furniture.image;
    furniture.link = link || furniture.link;

    await furniture.save(); // ✅ Save updates

    res.json({ message: "Furniture updated successfully", furniture });
  } catch (error) {
    console.error("Error updating furniture:", error);
    res.status(500).json({ message: "Error updating furniture" });
  }
};

// Delete furniture (Admin only)
export const deleteFurniture = async (req, res) => {
  try {
    const { id } = req.params; // ✅ Get furniture ID from URL

    const furniture = await Furniture.findById(id);
    if (!furniture) {
      return res.status(404).json({ message: "Furniture not found" });
    }

    await furniture.deleteOne(); // ✅ Delete from database

    res.json({ message: "Furniture deleted successfully" });
  } catch (error) {
    console.error("Error deleting furniture:", error);
    res.status(500).json({ message: "Error deleting furniture" });
  }
};
