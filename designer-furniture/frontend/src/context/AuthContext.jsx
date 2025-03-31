import { createContext, useState } from "react";
import apiHandler from "../api/apiHandler";
import { authRoutes } from "../api/apiRoutes";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [message, setMessage] = useState({ type: "", text: "" });

    // Login
    const login = async (email, password) => {
        try {
            const response = await apiHandler(authRoutes.login, { email, password });
            if (!response) throw new Error("Invalid email or password");

            setMessage({ type: "success", text: "Login successful! Redirecting..." });
            localStorage.setItem("user", JSON.stringify(response.user));
            localStorage.setItem("token", response.token);
            setUser(response.user);

            return true;  // Success
        } catch (error) {
            setMessage({ type: "error", text: error.message });
            return false; // Failure
        }
    };

    // Register
    const register = async (name, email, password) => {
        try {
            const response = await apiHandler(authRoutes.register, { name, email, password });
            if (!response) throw new Error("Registration failed");

            setMessage({ type: "success", text: response.message || "Account created! Check your email to verify your account." });
            return true; // Success
        } catch (error) {
            setMessage({ type: "error", text: error.message });
            return false; // Failure
        }
    };

    // Logout
    const logout = async () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setMessage({ type: "success", text: "Logged out successfully!" });
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, message, setMessage }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
