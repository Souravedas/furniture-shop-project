import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext"; // ✅ Import AuthContext
import "../css/styles.css"; // ✅ Import CSS

const Navbar = ({ scrollToAbout }) => {  // ✅ Accept the scrollToAbout prop
  const { user } = useContext(AuthContext); // ✅ Get User Info
  const [dropdownOpen, setDropdownOpen] = useState(false); // ✅ State for dropdown

  // ✅ Handle dropdown toggle
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  // ✅ Get user's initials if no profile picture
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
          {/* ✅ Left Side: Logo */}
          <div className="logo">
            <Link to="/">
              <img src="/images/logo.jpg" alt="Logo" />
              <span>EliteFurnish</span>
            </Link>
          </div>

          {/* ✅ Right Side: Menu Items */}
          <div className="menu">
            <ul>
              {/* ✅ Update the About link to call scrollToAbout */}
              <li><button onClick={scrollToAbout}>About</button></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/search">Product</Link></li>
              {user && user.isAdmin && <li><Link to="/admin">Admin Panel</Link></li>}
              
              {user ? (
                <li className="profile-menu">
                  <div className="profile-dropdown" onClick={toggleDropdown}>
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt="Profile" className="profile-pic" />
                    ) : (
                      <div className="profile-initials">{getInitials(user.name)}</div>
                    )}
                  </div>

                  {/* ✅ Dropdown Menu */}
                  {dropdownOpen && (
                    <ul className="dropdown-menu">
                      <li><Link to="/profile">Profile</Link></li>
                      <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                  )}
                </li>
              ) : (
                <>
                  <li className="navbar-login"><Link to="/login">Login</Link></li>
                  <li className="navbar-register"><Link to="/register">Register</Link></li>
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
