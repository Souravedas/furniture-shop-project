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
