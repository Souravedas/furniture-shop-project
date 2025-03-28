import React, { useContext } from 'react'
import { NavLink } from 'react-router'
import { AuthContext } from '../context/AuthContext'

const Footer = ({ scrollToAbout, scrollToContact }) => {
	const { user } = useContext(AuthContext)

	return (
		<footer className="footer">
			<div className="container">
				<div className="footer-content">

					{/* Left Side - Quick links */}
					<div className="footer-links">
						<h3>Quick links</h3>
						<ul>
							<li>
								<button onClick={scrollToAbout} className='footer-btn'>About</button>
							</li>
							<li>
								<button onClick={scrollToContact} className='footer-btn'>Contact</button>
							</li>
							<li><NavLink to="/search" className='footer-btn'>Products</NavLink></li>

							{!user && <li><NavLink to="/login" className='footer-btn'>Login</NavLink></li>}
							{user && <li><NavLink to="/profile" className='footer-btn'>Profile</NavLink></li>}
						</ul>
					</div>

					{/* Center - Logo & Copyright */}
					<div className="footer-logo">
						<img src="https://st4.depositphotos.com/16030310/25209/v/450/depositphotos_252091768-stock-illustration-vector-illustration-blue-letters.jpg" alt="EliteFurnish Logo" />
						<p>© 2025 EliteFurnish. All rights reserved.</p>
					</div>

					{/* Right Side - Social Media */}
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
							<a href="https://www.NavLinkedin.com" target="_blank" rel="noopener noreferrer">
								<i className="fa-brands fa-linkedin-in"></i>
							</a>
						</div>
					</div>

				</div>
			</div>
		</footer>
	)
}

export default Footer