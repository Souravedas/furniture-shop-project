import React, { useState, useEffect } from "react";
import axios from "axios";
// import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  // const {logout } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // default value as null
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login"); // ✅ Redirect if no token (user not logged in)
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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "/api/profile",
        { name, email, profilePicture }, // ✅ Now sending the updated profile picture
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      alert("Profile updated!");
      setProfilePicture(response.data.user.profilePicture); // ✅ Update state with the new image
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

  // Get user's initials if no profile picture
  const getInitials = (fullName) => {
    if (!fullName) return "U"; // ✅ Default to "U" if name is missing
    const words = fullName.trim().split(" ");
    return words.length > 1
      ? words[0][0].toUpperCase() + words[1][0].toUpperCase() // ✅ "John Doe" → "JD"
      : words[0][0].toUpperCase(); // ✅ "John" → "J"
  };


  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Picture with Base64 Handling */}
        <div className="profile-image">
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" className="profile-pic" />
          ) : (
            <div className="profile-initial">{getInitials(name)}</div> // ✅ Use `name` instead of `user.name`
          )}
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
      </div>
    </div>
  );
};

export default ProfilePage;
