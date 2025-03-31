import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const VerifyEmailSuccess = () => {

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/verify-email-success", { replace: true })
    }, 500)
  }, [navigate])

  return (
    <div className="verify-success-container">
      <div className="verify-success-card">
        <h2>🎉 Email Verified!</h2>
        <p>Your email has been successfully verified. You can now log in and access your account.</p>
        
        <NavLink to="/login" className="login-button">Go to Login</NavLink>
        
        <div className="celebration-animation">
          🎊 🎈 🎉
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailSuccess;
