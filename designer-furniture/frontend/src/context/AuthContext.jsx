import { createContext, useState } from "react"
import apiHandler from "../api/apiHandler"
import { authRoutes } from "../api/apiRoutes"
import { toast } from "react-toastify"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            // Fix for string "undefined"
            if (!storedUser || storedUser === "undefined") return null;
            return JSON.parse(storedUser);
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            return null;
        }
    });

    const [message, setMessage] = useState({ type: "", text: "" })

    // Login
    const login = async (email, password) => {
        const response = await apiHandler(authRoutes.login, { email, password });

        if (response?.error) {
            toast.error(response.message || "Login failed");
            return false;
        }

        toast.success("Login successful! Redirecting...");
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        setUser(response.user);
        return true;
    };


    // Register
    const register = async (name, email, password) => {
        const response = await apiHandler(authRoutes.register, { name, email, password })

        if (response?.error) {
            toast.error(response.error)
            return false
        }

        toast.success(response.message || "✅ Account is registered! please check your email for verification.")
        return true
    }


    // Logout
    const logout = async () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
        setMessage({ type: "success", text: "Logged out successfully!" })
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, message, setMessage }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
