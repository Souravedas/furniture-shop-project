import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let response = await login(email, password);
		if (!response) return;
		navigate("/");
	};

	return (
		<div className="login-container">
			<div className="login-card">
				<h2 className="login-title">Login</h2>
				<form onSubmit={handleSubmit}>
					<div className="login-input-group">
						<i className="fa-solid fa-envelope"></i>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className="login-input-group">
						<i className="fa-solid fa-lock"></i>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<button type="submit" className="login-button">Login</button>
				</form>

				<p className="login-links">
					<NavLink to="/forgot-password">Forgot Password?</NavLink>
				</p>
				<p className="login-links">
					Don't have an account? <NavLink to="/register">Register</NavLink>
				</p>
			</div>
		</div>
	);
};

export default Login;
