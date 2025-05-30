import express from 'express';
import { getAllUsers, deleteUser, submitReview, getAllReviews, deleteReview, clearUserMessage } from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin routes
router.get("/", protect, admin, getAllUsers)
router.delete("/:id", protect, admin, deleteUser)

// 🆕 Review routes
router.post("/review", protect, submitReview)
router.get("/reviews", getAllReviews)
router.delete("/reviews/:createdAt", protect, admin, deleteReview)
// Clear user's message
router.patch("/:id/clear-message", protect, admin, clearUserMessage)


export default router
