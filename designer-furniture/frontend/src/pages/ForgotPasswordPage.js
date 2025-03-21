import React, { useState } from "react";
import axios from "axios";
import "../css/styles.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleSendOtp = async () => {
    try {
      await axios.post("/api/auth/forgot-password", { email });
      alert("OTP sent to your email.");
      setStep(2);
    } catch (error) {
      alert("Error sending OTP.");
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.post("/api/auth/reset-password", { email, otp: Number(otp), newPassword });
      alert("Password reset successfully!");
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      alert("Invalid OTP or error resetting password.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {step === 1 ? (
        <>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button onClick={handleSendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <button onClick={handleResetPassword}>Reset Password</button>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
