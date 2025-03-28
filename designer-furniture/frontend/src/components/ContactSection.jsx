import React, { useState } from "react"

const ContactSection = ({ contactRef }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form Submitted:", formData)
        alert("Your message has been sent!")
        setFormData({ name: "", email: "", phone: "", message: "" })
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

                <form onSubmit={handleSubmit}>
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
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </form>
                <button type="submit" className="send-btn">Send</button>

            </div>
        </section>
    )
}

export default ContactSection
