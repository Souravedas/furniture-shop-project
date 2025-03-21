import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext"; // ✅ Import AuthContext
import "../styles/Navbar.css"; // ✅ Import CSS

const Navbar = () => {
  const { user } = useContext(AuthContext); // ✅ Get User Info

  return (
    <nav className="navbar">
      {/* ✅ Left Side: Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>

      {/* ✅ Right Side: Menu Items */}
      <ul className="navbar-links">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {user && user.isAdmin && <li><Link to="/admin">Admin Panel</Link></li>}
        {user ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={() => { localStorage.clear(); window.location.reload(); }}>Logout</button></li>
          </>
        ) : (
          <>
            <li className="navbar-login">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
