import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ scrollToAbout, scrollToContact }) => {
	const { user, setUser } = useContext(AuthContext);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const dropdownRef = useRef(null);
	const navigate = useNavigate();

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

	const handleLogout = () => {
		localStorage.clear();
		window.location.reload();
		setUser(null);
		navigate("/login");
	};

	const getInitials = (fullName) => {
		if (!fullName) return "U";
		const words = fullName.trim().split(" ");
		return words.length > 1
			? words[0][0].toUpperCase() + words[1][0].toUpperCase()
			: words[0][0].toUpperCase();
	};

	return (
		<nav className="navigation">
			<div className="container">
				<div className="nav-wrapper">
					{/* Logo */}
					<div className="logo">
						<NavLink to="/">
							<img src="https://st4.depositphotos.com/16030310/25209/v/450/depositphotos_252091768-stock-illustration-vector-illustration-blue-letters.jpg" alt="Logo" />
							<span>EliteFurnish</span>
						</NavLink>
					</div>

					{/* Hamburger */}
					<div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
						<span></span>
						<span></span>
						<span></span>
					</div>

					{/* Menu */}
					<div className={`menu ${menuOpen ? "open" : ""}`}>
						<ul>
							<li><button onClick={scrollToAbout} className="active">About</button></li>
							<li><button onClick={scrollToContact} className="active">Contact</button></li>
							<li><NavLink to="/search" className="active a-btn">Products</NavLink></li>

							{user && user.isAdmin && (
								<li><NavLink to="/admin" className="active">Admin Panel</NavLink></li>
							)}

							{user && user.name ? (
								<li className="profile-menu" ref={dropdownRef}>
									<div
										className="profile-dropdown"
										onMouseEnter={() => setDropdownOpen(true)}
										onMouseLeave={() => setDropdownOpen(false)}
									>
										{user.profilePicture ? (
											<img src={user.profilePicture} alt="Profile" className="logo-profile-pic" />
										) : (
											<div className="profile-initials">{getInitials(user.name)}</div>
										)}
										<ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
											<li><NavLink to="/profile" className="active">Profile</NavLink></li>
											<li><button onClick={handleLogout} className="active">Logout</button></li>
										</ul>
									</div>
								</li>
							) : (
								<>
									<li><NavLink to="/login" className="active">Login</NavLink></li>
									<li><NavLink to="/register" className="active">Register</NavLink></li>
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
