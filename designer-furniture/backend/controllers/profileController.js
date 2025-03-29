const User = require("../models/user");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, profilePicture } = req.body;
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.profilePicture = profilePicture || user.profilePicture; // Save Cloudinary URL
      await user.save();
      res.json({ message: "Profile updated successfully", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Upload profile picture
exports.uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Upload image to Cloudinary
    cloudinary.uploader.upload_stream(
      { folder: "profile_pictures", width: 500, height: 500, crop: "fill" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: error.message });

        // Save image URL in MongoDB
        const user = await User.findByIdAndUpdate(
          userId,
          { profilePicture: result.secure_url },
          { new: true }
        );

        res.json({ message: "Profile picture updated", user });
      }
    ).end(req.file.buffer);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update last search
exports.updateLastSearch = async (req, res) => {
  try {
    const { lastSearchCategory } = req.body;
    const user = await User.findById(req.user.id);

    if (user) {
      user.lastSearchCategory = lastSearchCategory;
      await user.save();
      res.json({ message: "Last search updated", lastSearchCategory });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
