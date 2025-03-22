import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/styles.css"; // ✅ Import styles

const ProductSection = () => {
  const navigate = useNavigate();
  const categories = ["sofa", "table", "chair", "cushion", "living_table"];

  return (
    <section className="product-section">
      <div className="container">
        <div className="section-title">
          <h2>Explore Our Products</h2>
        </div>

        <div className="products-grid">
          {categories.map((category) => (
            <div 
              key={category} 
              className="product-item" 
              onClick={() => navigate(`/search?category=${category}`)}
            >
              <div className="product-image">
                <img src={`/images/${category}.jpg`} alt={category} />
                <div className="overlay">
                  <p>{category}</p>
                </div>
              </div>
              <p className="product-name">{category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
