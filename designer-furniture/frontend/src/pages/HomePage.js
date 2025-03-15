import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar"; // Import SearchBar
import "./HomePage.css";

const furnitureImages = [
  "/images/table.jpg",
  "/images/sofa.jpg",
  "/images/chair.jpg",
  "/images/living-table.jpg",
  "/images/cushion.jpg",
];

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % furnitureImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle search query
  const handleSearch = (filters) => {
    console.log("Navigating with query:", filters);
    const queryParams = new URLSearchParams(filters).toString();
    navigate(`/search?${queryParams}`);
  };

  return (
    <div className="homepage">
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Navigation */}
      <nav>
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#furniture-showcase">Furniture</a></li>
          <li><a href="#news">News</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Designer Furniture</h1>
        <p>Discover the perfect furniture for your home.</p>
      </section>

      {/* Furniture Showcase */}
      <div className="furniture-showcase">
        <h2>Furniture Showcase</h2>
        <div className="furniture-grid">
          {furnitureImages.map((image, index) => (
            <div key={index} className="furniture-item">
              <img src={image} alt={`Furniture ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Animated Furniture Showcase */}
      <div className="image-slider">
        <img src={furnitureImages[currentImage]} alt="Furniture Showcase" />
      </div>

      {/* Scroll Button */}
      <button className="scroll-btn" onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}>
        Scroll Down
      </button>

      {/* News Section */}
      <section className="news">
        <h2>Furniture News</h2>
        <p>Read the latest trends and styles in furniture design.</p>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>Find designer furniture from top brands, all in one place.</p>
      </section>

      {/* Product Categories */}
      <section className="categories">
        <h2>Browse Categories</h2>
        <div className="category-list">
          {["Table", "Sofa", "Chair", "Living Table", "Cushion"].map((category) => (
            <button key={category} onClick={() => navigate(`/search?query=${category}`)}>
              {category}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
