import React, { useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AdminPanel from "./pages/AdminPanel";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer"; 
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const aboutRef = useRef(null);  
  const contactRef = useRef(null);  // ✅ Create a reference for the Contact Section

  // ✅ Function to scroll to About Section
  const scrollToAbout = () => {
    if (location.pathname === "/") {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  // ✅ Function to scroll to Contact Section
  const scrollToContact = () => {
    if (location.pathname === "/") {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        contactRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  const hideFooter = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/forgot-password";

  return (
    <AuthProvider>
      {/* ✅ Pass scrollToAbout and scrollToContact to Navbar */}
      <Navbar scrollToAbout={scrollToAbout} scrollToContact={scrollToContact} />   
      <Routes>
        <Route path="/" element={<HomePage aboutRef={aboutRef} contactRef={contactRef} />} />  
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
      
      {!hideFooter && <Footer />}
    </AuthProvider>
  );
}

export default App;
