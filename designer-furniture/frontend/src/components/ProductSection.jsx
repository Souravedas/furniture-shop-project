import React from "react";
import { useNavigate } from "react-router-dom";

const ProductSection = () => {
    const navigate = useNavigate();

    // ✅ Use image URLs instead of local file paths
    const products = [
        { name: "sofa", imageUrl: "https://img.freepik.com/premium-photo/black-traditional-loft-with-wall-panels-leather-sofa-carpet-decor-sketch_872147-18799.jpg" },
        { name: "table", imageUrl: "https://wallpapercave.com/wp/wp12567036.jpg" },
        { name: "chair", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCZv19hAtG8kNgmygu0EAl4kPXXpFu1Ol2DQ&s" },
        { name: "cushion", imageUrl: "https://images.pexels.com/photos/1239298/pexels-photo-1239298.jpeg?cs=srgb&dl=pexels-designecologist-1239298.jpg&fm=jpg" },
        { name: "dining table", imageUrl: "https://st.depositphotos.com/1987395/1929/i/450/depositphotos_19290839-stock-photo-interior-design-series-modern-colorful.jpg" }
    ];

    const formatCategoryName = (category) => {
        return category.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <section className="product-section">
            <div className="container">
                <div className="section-title">
                    <h2>Explore Our Products</h2>
                </div>

                <div className="products-grid">
                    {products.map((product) => (
                        <div
                            key={product.name}
                            className="product-item"
                            onClick={() => navigate(`/search?category=${encodeURIComponent(product.name)}`)}
                        >
                            <div className="product-image">
                                <img src={product.imageUrl} alt={formatCategoryName(product.name)} />
                                <div className="overlay">
                                    <p>{formatCategoryName(product.name)}</p>
                                </div>
                            </div>
                            <p className="product-name">{formatCategoryName(product.name)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
