import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext"; // ✅ Import AuthContext

const Navbar = () => {
  const { user } = useContext(AuthContext); // ✅ Define user

  return (
    <nav>
      <h1>Designer Furniture Search</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Product</Link></li>

        {user && user.isAdmin && <li><Link to="/admin">Admin Panel</Link></li>}
        {user ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={() => { localStorage.clear(); window.location.reload(); }}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
