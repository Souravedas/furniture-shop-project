import User from "../models/User.js"

// DELETE a user by ID
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ message: "User not found" })

        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        console.error("Delete user error:", error)
        res.status(500).json({ message: "Server error" })
    }
}

// GET all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve users" })
    }
}

// Submit a review
export const submitReview = async (req, res) => {
    try {
        const { rating, content } = req.body

        if (!rating || !content) {
            return res.status(400).json({ message: "Rating and content are required" })
        }

        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const newReview = {
            content,
            rating,
            createdAt: new Date()
        }

        // If user already has reviews array, push new one, otherwise create
        user.reviews = user.reviews || []
        user.reviews.push(newReview)

        await user.save()

        res.status(201).json({ message: "Review submitted successfully" })
    } catch (error) {
        console.error("Submit review error:", error)
        res.status(500).json({ message: "Server error" })
    }
}

// 🆕 Fetch all reviews
export const getAllReviews = async (req, res) => {
    try {
        const users = await User.find({ "reviews.0": { $exists: true } }).select("name reviews")

        const allReviews = users.flatMap(user =>
            user.reviews.map(review => ({
                name: user.name,
                content: review.content,
                rating: review.rating,
                createdAt: review.createdAt,
            }))
        )

        res.status(200).json(allReviews)
    } catch (error) {
        console.error("Get reviews error:", error)
        res.status(500).json({ message: "Failed to retrieve reviews" })
    }
}

// DELETE specific review by createdAt
export const deleteReview = async (req, res) => {
    try {
        const { createdAt } = req.params

        const user = await User.findOne({ "reviews.createdAt": new Date(createdAt) })

        if (!user) return res.status(404).json({ message: "Review not found" })

        user.reviews = user.reviews.filter(
            (review) => review.createdAt.toISOString() !== new Date(createdAt).toISOString()
        )

        await user.save();
        res.status(200).json({ message: "Review deleted successfully" })
    } catch (error) {
        console.error("Delete review error:", error)
        res.status(500).json({ message: "Server error" })
    }
}

// Clear a user's message
export const clearUserMessage = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ message: "User not found" })

        user.message = ""
        await user.save()

        res.status(200).json({ message: "User message cleared successfully." })
    } catch (error) {
        console.error("Clear message error:", error)
        res.status(500).json({ message: "Server error" })
    }
}
