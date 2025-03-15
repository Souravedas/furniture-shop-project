import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // Ensure this is using .js if it's an ES Module
import furnitureRoutes from "./routes/FurnitureRoutes.js"; 
import designerRoutes from "./routes/DesignerRoutes.js"; 
import adminRoutes from "./routes/adminRoutes.js"; // Fix the import here

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/furniture", furnitureRoutes);
app.use("/api/designers", designerRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
