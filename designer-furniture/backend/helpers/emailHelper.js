import nodemailer from "nodemailer"

const sendEmail = async (to, subject, text) => {
	const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	})

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to,
		subject,
		text,
	}

	try {
		const info = await transporter.sendMail(mailOptions)
		console.log("Email sent successfully:", info.response)
	} catch (error) {
		console.error("Email Sending Error:", error)
	}
}

export default sendEmail