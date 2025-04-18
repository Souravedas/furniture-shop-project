import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const ForgotPassword = () => {
	const [email, setEmail] = useState("")
	const [otp, setOtp] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [step, setStep] = useState(1)
	const [message, setMessage] = useState("")
	const [error, setError] = useState("")

	const handleSendOtp = async () => {
		setMessage("")
		setError("")

		try {
			await axios.post("/api/auth/forgot-password", { email })
			toast.success("OTP sent to your email!")
			setStep(2)
		} catch (error) {
			toast.error(error.response?.data?.message || "⚠️ Error sending OTP.")
		}
	};

	const handleResetPassword = async () => {
		setMessage("")
		setError("")

		// console.log("Sending reset request with:", { email, otp, newPassword })

		try {
			axios.post("http://localhost:5123/api/auth/reset-password", { email, otp: Number(otp), newPassword })
			toast.success("✅ Password reset successfully!")
			setTimeout(() => {
				window.location.href = "/login"
			}, 1000)
		} catch (error) {
			// console.error("Error resetting password:", error.response ? error.response.data : error.message)
			toast.error(error.response?.data?.message || "⚠️ Invalid OTP.")
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
	)
}

export default ForgotPassword
