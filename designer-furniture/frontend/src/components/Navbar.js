import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../css/styles.css";

const Navbar = ({ scrollToAbout, scrollToContact }) => {
  const { user } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  // Get user's initials if no profile picture
  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((word) => word[0].toUpperCase())
          .join("")
      : "U";
  };

  return (
    <nav className="navigation">
      <div className="container">
        <div className="nav-wrapper">
          {/* Left Side: Logo */}
          <div className="logo">
            <Link to="/">
              <img src="/images/logo.jpg" alt="Logo" />
              <span>EliteFurnish</span>
            </Link>
          </div>

          {/* ✅ Right Side: Menu Items */}
          <div className="menu">
            <ul>
              <li>
                <button onClick={scrollToAbout}>About</button>
              </li>
              <li>
                <button onClick={scrollToContact}>Contact</button>
              </li>
              <li>
                <button onClick={() => window.location.href = '/search'}>Products</button>
              </li>
              {user && user.isAdmin && (
                <li>
                  <button to="/admin">Admin Panel</button>
                </li>
              )}

              {user ? (
                <li className={`profile-menu ${dropdownOpen ? "open" : ""}`} ref={dropdownRef}>
                <div className="profile-dropdown" onClick={toggleDropdown}>
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="profile-pic"
                    />
                  ) : (
                    <div className="profile-initials">{getInitials(user.name)}</div>
                  )}
                </div>
              
                {/* Dropdown Menu */}
                <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                  <li>
                    <button to="/profile">Profile</button>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </li>
              
              ) : (
                <>
                  <li className="navbar-login">
                    <Link to="/login">Login</Link>
                  </li>
                  <li className="navbar-register">
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
