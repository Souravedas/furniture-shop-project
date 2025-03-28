import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/styles.css"; // ✅ Import styles
import { formatCategoryName } from "../utils/formatCategory"; // ✅ Import helper function

const ProductSection = () => {
  const navigate = useNavigate();
  const categories = ["sofa", "table", "chair", "cushion", "dining table"]; // ✅ No underscore

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
              onClick={() => navigate(`/search?category=${encodeURIComponent(category)}`)} // ✅ Encode space
            >
              <div className="product-image">
                <img src={`/images/${category.replace(/\s+/g, "_")}.jpg`} alt={formatCategoryName(category)} /> 
                <div className="overlay">
                  <p>{formatCategoryName(category)}</p> 
                </div>
              </div>
              <p className="product-name">{formatCategoryName(category)}</p> 
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
