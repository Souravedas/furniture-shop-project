import { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  // Function to login
  const login = async (email, password) => {
    const res = await axios.post("/api/auth/login", { email, password });
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  // Function to register
  const register = async (name, email, password) => {
    await axios.post("/api/auth/register", { name, email, password });
  };

  // Function to logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
