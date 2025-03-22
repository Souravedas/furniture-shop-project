import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext"; // ✅ Import AuthContext
import "../css/styles.css"; // ✅ Import CSS

const Footer = () => {
  const { user } = useContext(AuthContext); // ✅ Get logged-in user info

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">

          {/* ✅ Left Side - Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="/search">Products</a></li>

              {/* ✅ Show Login only if user is NOT logged in */}
              {!user && <li><Link to="/login">Login</Link></li>}

              {/* ✅ Show Profile instead of Login if user is logged in */}
              {user && <li><Link to="/profile">Profile</Link></li>}
            </ul>
          </div>

          {/* ✅ Center - Logo & Copyright */}
          <div className="footer-logo">
            <img src="/images/logo.jpg" alt="EliteFurnish Logo" />
            <p>© 2025 EliteFurnish. All rights reserved.</p>
          </div>

          {/* ✅ Right Side - Social Media */}
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
