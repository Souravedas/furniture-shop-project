import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    setMessage("");
    setError("");

    try {
      await axios.post("/api/auth/forgot-password", { email });
      setMessage("✅ OTP sent to your email.");
      setStep(2);
    } catch (error) {
      setError("⚠️ If this email exists, a reset link has been sent.");
    }
  };

  const handleResetPassword = async () => {
    setMessage("");
    setError("");

    try {
      await axios.post("/api/auth/reset-password", { email, otp: Number(otp), newPassword });
      setMessage("✅ Password reset successfully!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      setError("⚠️ Invalid OTP or error resetting password.");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-title">🔑 Forgot Password?</h2>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        {step === 1 ? (
          <>
            <div className="input-group">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button onClick={handleSendOtp} className="animated-button">Send OTP</button>
          </>
        ) : (
          <>
            <div className="input-group">
              <i className="fa-solid fa-key"></i>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <button onClick={handleResetPassword} className="animated-button">Reset Password</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
