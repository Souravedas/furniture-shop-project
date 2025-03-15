import mongoose from "mongoose";

const furnitureSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    designer: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    purchaseLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Furniture = mongoose.model("Furniture", furnitureSchema);
export default Furniture;
