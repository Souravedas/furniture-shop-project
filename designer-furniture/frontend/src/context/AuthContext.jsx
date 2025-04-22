import React, { createContext, useState } from "react"
import apiHandler from "../api/apiHandler"
import { authRoutes } from "../api/apiRoutes"
import { toast } from "react-toastify"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    // Initialize user from localStorage
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user")
            if (!storedUser || storedUser === "undefined") return null
            return JSON.parse(storedUser)
        } catch (error) {
            console.error("Error parsing user from localStorage:", error)
            return null
        }
    })

    const [message, setMessage] = useState({ type: "", text: "" })

    // Login
    const login = async (email, password) => {
        const response = await apiHandler(authRoutes.login, { email, password })

        if (response?.error) {
            toast.error(response.message || "Login failed")
            return false
        }

        toast.success("Login successful! Redirecting...")
        // Persist user and token
        localStorage.setItem("user", JSON.stringify(response.user))
        localStorage.setItem("token", response.token)
        setUser(response.user)

        // After login, auto-send any unsent contact message
        const unsent = localStorage.getItem("unsentContact")
        if (unsent) {
            try {
                const contactData = JSON.parse(unsent)
                const contactRes = await apiHandler(
                    { method: "post", url: "/api/contact/submit" },
                    { phone: contactData.phone, message: contactData.message }
                )
                if (!contactRes?.error) {
                    toast.success("Your previous contact message has been sent!")
                    localStorage.removeItem("unsentContact")
                }
            } catch (err) {
                console.error("Error sending unsent contact message:", err)
            }
        }

        return true
    }

    // Register
    const register = async (name, email, password) => {
        const response = await apiHandler(authRoutes.register, { name, email, password })

        if (response?.error) {
            toast.error(response.error)
            return false
        }

        toast.success(response.message || "✅ Account is registered! Please check your email for verification.")
        return true
    }

    // Logout
    const logout = async () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.removeItem("unsentContact")
        setUser(null)
        setMessage({ type: "success", text: "Logged out successfully!" })
    }

    return (
        <AuthContext.Provider
            value={{ user, setUser, login, register, logout, message, setMessage }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
