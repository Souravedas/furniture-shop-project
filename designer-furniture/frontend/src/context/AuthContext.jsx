import { createContext, useState } from "react"
import apiHandler from "../api/apiHandler"
import { authRoutes } from "../api/apiRoutes"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)


    // login
    const login = async (email, password) => {
        const response = await apiHandler(authRoutes.login, { email, password })
        console.log(response)
        if (!response) return
        alert("Login successful")
        localStorage.setItem("user", JSON.stringify(response?.user))
        localStorage.setItem("token", response?.token)
        setUser(response?.user)
        return true
    }

    // register
    const register = async (name, email, password) => {
        const response = await apiHandler(authRoutes.register, { name, email, password })
        if (!response) return
        alert(response?.message)
        return true
    }

    // logout
    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
    }


    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider