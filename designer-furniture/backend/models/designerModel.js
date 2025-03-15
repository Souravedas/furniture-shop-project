import mongoose from "mongoose";

const DesignerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    furniture: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Furniture' }] // Reference to furniture
});

export default  mongoose.model('Designer', DesignerSchema);
