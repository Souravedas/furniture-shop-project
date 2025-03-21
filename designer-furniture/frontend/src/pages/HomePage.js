import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageSlider from "../components/ImageSlider";
import Navbar from "../components/Navbar"; // Only import once
import "../css/styles.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const aboutRef = useRef(null); // Create ref for the About section

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await axios.get("/api/furniture");
        setImages(response.data.map(item => item.image).slice(0, 5));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchSliderImages();
  }, []);

  // Function to scroll to the About section
  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Only render Navbar once */}
      <Navbar scrollToAbout={scrollToAbout} />

      {/* Image Slider */}
      <ImageSlider images={images} />

      {/* About Section */}
      <section className="about my-section" id="about" ref={aboutRef}>
        <div className="container">
          <div className="section-title">
            <h2>About Us</h2>
          </div>

          <div className="inner-wrapper">
            <div className="left-side">
              <div className="about-img">
                <img src="/images/about.jpg" alt="Modern furniture showroom" />
              </div>
            </div>

            <div className="right-side">
              <h3>Welcome to EliteFurnish</h3>
              <p>
                At <strong>EliteFurnish</strong>, we believe that <em>furniture is more than just decor</em>—it's a reflection of style, comfort, and personality.  
                Our platform connects you with a curated selection of <strong>high-quality designer furniture</strong>, making it easy to find the perfect piece for your home.
              </p>

              <p>
                <strong>🌟 Why Choose EliteFurnish?</strong><br />
                ✔ <strong>Curated Collection</strong> – We showcase only the finest <em>sofas, tables, chairs, and cushions</em> from leading designers.<br />
                ✔ <strong>Smart Search & Compare</strong> – Find furniture by category and compare details effortlessly.<br />
                ✔ <strong>Seamless Experience</strong> – Simple navigation, smooth search algorithms, and a user-friendly interface.<br />
                ✔ <strong>Verified Listings</strong> – We work with <em>trusted brands</em> to ensure authenticity and quality.
              </p>

              <p>
                Whether you're looking for a <strong>luxury sofa for your living room</strong>, a <strong>modern dining table</strong>, or a <strong>comfortable designer chair</strong>, 
                EliteFurnish makes it easier to find what you need.
              </p>

              <p><strong>🌍 Start Exploring Today!</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <p>Contact us at <a href="mailto:support@furnitureshop.com">support@furnitureshop.com</a></p>
            <img src="/images/contact.jpg" alt="Customer Support" width="40%" />
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="product-section">
        <h2>Explore Our Products</h2>
        <div className="product-grid">
          {["sofa", "table", "chair", "cushion", "living table"].map((category) => (
            <div key={category} className="product-item" onClick={() => navigate(`/search?category=${category}`)}>
              <img src={`/images/${category}.jpg`} alt={category} style={{ width: "100%", height: "auto", cursor: "pointer", transition: "transform 0.3s ease", ":hover": { transform: "scale(1.1)" }, ":active": { transform: "scale(0.9)", backgroundColor: "rgba(0, 0, 0, 0.1)", borderRadius: "5px" } }}/>
              <p>{category}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
