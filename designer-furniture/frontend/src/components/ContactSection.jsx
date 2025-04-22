import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import apiHandler from "../api/apiHandler"
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"

const ContactSection = ({ contactRef }) => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            localStorage.setItem("unsentContact", JSON.stringify(formData))
            navigate("/login")
            return
        }

        try {
            const response = await apiHandler(
                { method: "post", url: "/api/contact/submit" },
                { phone: formData.phone, message: formData.message }
            )

            if (response?.error) {
                alert(response.message || "Something went wrong")
            } else {
                toast.success("Your message has been sent!")
                setFormData({ name: "", email: "", phone: "", message: "" })
                localStorage.removeItem("unsentContact")
            }

        } catch (error) {
            alert(error?.message || "Something went wrong")
        }
    }


    return (
        <section className="contact my-section" id="contact" ref={contactRef}>
            <div className="container">
                <div className="section-title">
                    <p>Have something to say?</p>
                    <h2>Contact Us</h2>
                </div>

                {/* Contact Info */}
                <div className="contact-box">
                    <a href="tel:+8801631158508">
                        <i className="fa-solid fa-phone"></i>
                        <p>+000 111 000</p>
                    </a>
                    <a href="souravedas444@gmail.com">
                        <i className="fa-solid fa-envelope"></i>
                        <p>EliteFurnish@mail.com</p>
                    </a>
                    <a href="https://www.facebook.com/EliteFurnish" target="_blank" rel="noopener noreferrer">
                        <i className="fa-solid fa-thumbs-up"></i>
                        <p>@EliteFurnish</p>
                    </a>
                </div>

                {/* Message Form */}
                <div className="message">
                    <p>Leave a message:</p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="input-box">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="boxes"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="boxes"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Your Phone"
                            className="boxes"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <textarea
                        name="message"
                        id="yourmessage"
                        placeholder="Your Message"
                        rows="7"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button type="submit" className="send-btn">Send</button>
                </form>

            </div>
        </section>
    )
}

export default ContactSection
