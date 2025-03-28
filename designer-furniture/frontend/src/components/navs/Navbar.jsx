import React, { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { NavLink } from "react-router-dom"

const Navbar = ({ scrollToAbout, scrollToContact }) => {

  const { user } = useContext(AuthContext)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev)
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle logout
  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  };

  // Get user's initials if no profile picture
  const getInitials = (fullName) => {
    if (!fullName) return "U"
    const words = fullName.trim().split(" ")
    return words.length > 1
      ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
      : words[0][0].toUpperCase()
  }

  return (
    <nav className="navigation">
      <div className="container">
        <div className="nav-wrapper">
          {/* Left Side: Logo */}
          <div className="logo">
            <NavLink to="/">
              <img src="https://st4.depositphotos.com/16030310/25209/v/450/depositphotos_252091768-stock-illustration-vector-illustration-blue-letters.jpg" alt="Logo" />
              <span>EliteFurnish</span>
            </NavLink>
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
                <NavLink to="/search">Products</NavLink>
              </li>
              {user && user.isAdmin && (
                <li>
                  <NavLink to="/admin">Admin Panel</NavLink>
                </li>
              )}

              {user && user.name ? (
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
                      <NavLink to="/profile">Profile</NavLink>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="navbar-login">
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li className="navbar-register">
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
