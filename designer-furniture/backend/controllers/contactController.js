import User from "../models/User.js"

// Handles submission of contact message by logged-in users
export const submitContact = async (req, res) => {
    try {
        const { phone, message } = req.body

        // Ensure user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized. Please login to send a message." })
        }

        // Update the authenticated user's record with contact info
        await User.findByIdAndUpdate(
            req.user._id,
            { phone, message },
            { new: true }
        )

        // Respond with success
        res.status(200).json({ message: "Your message has been sent successfully!" })
    } catch (error) {
        console.error("Contact form error:", error)
        res.status(500).json({ message: "Server error. Please try again later." })
    }
}