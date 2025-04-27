import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"

const ProfilePage = () => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [profilePicture, setProfilePicture] = useState(null)
	const [oldPassword, setOldPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const navigate = useNavigate()
	const { setUser, user } = useContext(AuthContext)

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/login")
		}
	}, [navigate])

	// Ensure user is updated after profile fetch
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get("/api/profile", {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				})

				setName(response.data.name)
				setEmail(response.data.email)
				setProfilePicture(response.data.profilePicture || null)

				// Update AuthContext state
				setUser(response.data)
			} catch (error) {
				console.error("Error fetching profile:", error)
			}
		}
		fetchProfile()
	}, [setUser])


	// Upload image to Cloudinary
	const uploadImageToCloudinary = async (file) => {
		const formData = new FormData()
		formData.append("file", file)
		formData.append("upload_preset", "furniture-shop")
		formData.append("cloud_name", "doxbal3s7")

		try {
			const response = await axios.post("https://api.cloudinary.com/v1_1/doxbal3s7/image/upload", formData)
			toast.success("Image uploaded successfully!")
			return response.data.secure_url
		} catch (error) {
			console.error("Error uploading image:", error)
			toast.error("Error uploading image. Please try again.")
			return null
		}
	}

	const handleUpdateProfile = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.put(
				"/api/profile",
				{ name, email, profilePicture },
				{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
			)

			if (response.status !== 200 || !response.data) {
				throw new Error("Invalid response from server")
			}

			// ✅ Update user state in AuthContext
			const updatedUser = { ...user, name, email, profilePicture }
			localStorage.setItem("user", JSON.stringify(updatedUser))
			setUser(updatedUser)

			toast.success("Profile updated successfully!")
		} catch (error) {
			console.error("Error updating profile:", error)
			toast.error("Error updating profile. Please try again.")
		}
	}


	const handleFileChange = async (e) => {
		const file = e.target.files[0]
		if (file) {
			const imageUrl = await uploadImageToCloudinary(file)
			if (imageUrl) {
				setProfilePicture(imageUrl)
			}
		}
	}

	const handleChangePassword = async (e) => {
		e.preventDefault()
		try {
			await axios.put(
				"/api/profile/change-password",
				{ oldPassword, newPassword },
				{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
			)
			toast.success("Password changed successfully!")
			setOldPassword("")
			setNewPassword("")
		} catch (error) {
			toast.error("Error changing password. Please try again.")
		}
	}

	// Get user's initials if no profile picture
	const getInitials = (fullName) => {
		if (!fullName) return ""
		const words = fullName.trim().split(" ")
		return words.length > 1
			? words[0][0].toUpperCase() + words[1][0].toUpperCase()
			: words[0][0].toUpperCase()
	}

	return (
		<div className="profile-container">
			<div className="profile-card">
				{/* Sidebar Profile Section */}
				<div className="profile-sidebar">
					{profilePicture ? (
						<img
							src={profilePicture}
							alt="Profile"
							className="profile-pic"
							onError={(e) => e.target.src = "/default-avatar.png"}
						/>
					) : (
						<div className="profile-initial">{getInitials(name)}</div>
					)}

					<h2>{name}</h2>
					<p>{email}</p>
					<label className="upload-btn">
						Change Photo
						<input type="file" onChange={handleFileChange} />
					</label>
				</div>

				{/* Main Content */}
				<div className="profile-content">
					{/* Update Profile Section */}
					<div className="profile-section">
						<h3>Update Profile</h3>
						<form onSubmit={handleUpdateProfile}>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Full Name"
								required
							/>
							<input
								type="email"
								value={email}
								placeholder="Email Address"
								disabled
								style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
								required
							/>
							<button
								type="submit"
								className="update-btn">
								Save Changes
							</button>
						</form>
					</div>

					{/* Change Password Section */}
					<div className="profile-section">
						<h3>Change Password</h3>
						<form onSubmit={handleChangePassword}>
							<input
								type="password"
								placeholder="Old Password"
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
								required
							/>
							<input
								type="password"
								placeholder="New Password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								required
							/>
							<button
								type="submit"
								className="password-btn">
								Update Password
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfilePage
