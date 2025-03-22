import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "../css/styles.css";

const ProfilePage = () => {
  const { logout } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // default value as null
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Base64 encoded image
      };
      reader.readAsDataURL(file); // Read the file as Data URL
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Picture with Base64 Handling */}
        <div className="profile-image">
          <img src={profilePicture || "https://via.placeholder.com/150"} alt="Profile" />
          <input type="file" onChange={handleFileChange} />
        </div>

        {/* Profile Info */}
        <h2>{name}</h2>
        <p className="profile-email">{email}</p>

        {/* Update Profile Form */}
        <form onSubmit={handleUpdateProfile} className="profile-form">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">Update Profile</button>
        </form>

        {/* Change Password Section */}
        <h3>Change Password</h3>
        <form onSubmit={handleChangePassword} className="profile-form">
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
          <button type="submit">Change Password</button>
        </form>

        {/* Logout Button */}
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;
