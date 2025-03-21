import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageSlider from "../components/ImageSlider";
import "../styles/global.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

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

  return (
    <div> {/* ✅ Wrap everything inside one div */}
      <h1>Welcome to Designer Furniture Search</h1>
      
      {/* Image Slider */}
      <ImageSlider images={images} />

      {/* Scroll Button */}
      <button 
        onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
        style={{ position: "relative", bottom: "20px", left: "50%", transform: "translateX(-50%)", padding: "10px 20px" }}>
        ⬇ Scroll Down
      </button>

      {/* About Section */}
      <div style={{ display: "flex", alignItems: "center", marginTop: "50px" }}>
        <img src="/about.jpg" alt="About Us" width="40%" />
        <p style={{ marginLeft: "20px" }}>We help you find the best designer furniture.</p>
      </div>

      {/* Contact Section */}
      <div style={{ display: "flex", alignItems: "center", marginTop: "50px" }}>
        <p style={{ marginRight: "20px" }}>Contact us at support@furnitureshop.com</p>
        <img src="/contact.jpg" alt="Contact Us" width="40%" />
      </div>

      {/* Product Section */}
      <h2>Explore Our Categories</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {["sofa", "table", "chair", "cushion", "living_table"].map((category) => (
          <div key={category} style={{ position: "relative", cursor: "pointer" }} onClick={() => navigate(`/search?category=${category}`)}>
            <img src={`/images/${category}.jpg`} alt={category} style={{ width: "200px", transition: "transform 0.3s" }} />
            <p style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.5)", color: "white", padding: "5px" }}>{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
