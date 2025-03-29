import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [profilePicture, setProfilePicture] = useState(null);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/login");
		}
	}, [navigate]);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get("/api/profile", {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				});
				setName(response.data.name);
				setEmail(response.data.email);
				setProfilePicture(response.data.profilePicture || "https://via.placeholder.com/150");
			} catch (error) {
				console.error("Error fetching profile:", error);
			}
		};
		fetchProfile();
	}, []);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfilePicture(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleUpdateProfile = async (e) => {
		e.preventDefault();
		try {
			await axios.put(
				"/api/profile",
				{ name, email, profilePicture },
				{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
			);
			alert("Profile updated!");
			window.location.reload();
		} catch (error) {
			alert("Error updating profile.");
		}
	};

	const handleChangePassword = async (e) => {
		e.preventDefault();
		try {
			await axios.put(
				"/api/profile/change-password",
				{ oldPassword, newPassword },
				{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
			);
			alert("Password changed successfully!");
			setOldPassword("");
			setNewPassword("");
		} catch (error) {
			alert("Error changing password.");
		}
	};

	return (
		<div className="profile-container">
			<div className="profile-card">
				{/* Sidebar Profile Section */}
				<div className="profile-sidebar">
					<img src={profilePicture} alt="Profile" className="profile-pic" />
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
							<input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
							<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required />
							<button type="submit" className="update-btn">Save Changes</button>
						</form>
					</div>

					{/* Change Password Section */}
					<div className="profile-section">
						<h3>Change Password</h3>
						<form onSubmit={handleChangePassword}>
							<input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
							<input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
							<button type="submit" className="password-btn">Update Password</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
