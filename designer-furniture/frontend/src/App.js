import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AdminPanel from "./pages/AdminPanel";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer"; 
import Navbar from "./components/Navbar"; 
import ForgotPasswordPage from "./pages/ForgotPasswordPage";


function App() {
  return (
    <AuthProvider>
      <Navbar /> {/* ✅ Navbar at the top */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
      <Footer /> {/* ✅ Footer at the bottom */}
    </AuthProvider>
  );
}

export default App;
