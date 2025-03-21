const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designer: { type: String, required: true },
  category: { type: String, required: true, enum: ["sofa", "table", "chair", "cushion", "living table"] },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true } // Redirect link
}, { timestamps: true });

const Furniture = mongoose.model("Furniture", furnitureSchema);

module.exports = Furniture;
