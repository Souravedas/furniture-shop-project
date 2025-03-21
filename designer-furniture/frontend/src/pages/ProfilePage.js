import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const ProfilePage = () => {
  const { logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProfile(response.data);
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
    } catch (error) {
      alert("Error changing password.");
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <img src={profile.profilePicture} alt="Profile" width="100" />
      <form onSubmit={handleUpdateProfile}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} placeholder="Profile Picture URL" />
        <button type="submit">Update Profile</button>
      </form>

      <h3>Change Password</h3>
      <form onSubmit={handleChangePassword}>
        <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <button type="submit">Change Password</button>
      </form>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
