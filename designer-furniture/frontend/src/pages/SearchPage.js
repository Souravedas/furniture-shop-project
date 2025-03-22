import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/styles.css";

const SearchPage = () => {
  const [category, setCategory] = useState("all");
  const [furniture, setFurniture] = useState([]);
  const [selectedItems, setSelectedItems] = useState(
    JSON.parse(localStorage.getItem("selectedItems")) || []
  );

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const response = await axios.get(
          category === "all" ? "/api/furniture" : `/api/furniture?category=${category}`
        );
        setFurniture(response.data);
      } catch (error) {
        console.error("Error fetching furniture:", error);
      }
    };

    fetchFurniture();
  }, [category]);

  // ✅ Handle furniture selection for comparison (Persistent)
  const handleSelect = (item) => {
    if (selectedItems.length < 2) {
      const updatedSelection = [...selectedItems, item];
      setSelectedItems(updatedSelection);
      localStorage.setItem("selectedItems", JSON.stringify(updatedSelection));
    } else {
      alert("You can only compare two items at a time!");
    }
  };

  // ✅ Clear comparison (Also clear from local storage)
  const clearComparison = () => {
    setSelectedItems([]);
    localStorage.removeItem("selectedItems");
  };

  return (
    <div className="search-container">
      <h2>Search & Compare Furniture</h2>

      {/* ✅ Category Filter */}
      <select onChange={(e) => setCategory(e.target.value)} className="category-dropdown">
        <option value="all">All Categories</option>
        <option value="sofa">Sofa</option>
        <option value="table">Table</option>
        <option value="chair">Chair</option>
        <option value="cushion">Cushion</option>
        <option value="living table">Living Table</option>
      </select>

      {/* ✅ Furniture Grid */}
      <div className="product-grid">
        {furniture.length > 0 ? (
          furniture.map((item) => (
            <div key={item._id} className="product-card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p><strong>Designer:</strong> {item.designer}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Price:</strong> ${item.price}</p>
              <div className="product-buttons">
                <button onClick={() => window.open(item.link, "_blank")}>View Product</button>
                <button onClick={() => handleSelect(item)}>Compare</button>
              </div>
            </div>
          ))
        ) : (
          <p>No furniture found.</p>
        )}
      </div>

      {/* ✅ Persistent Comparison Section */}
      {selectedItems.length > 0 && (
        <div className="comparison-container">
          <h2>Comparison</h2>
          <div className="comparison-grid">
            {selectedItems.map((item) => (
              <div key={item._id} className="comparison-card">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p><strong>Designer:</strong> {item.designer}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Price:</strong> ${item.price}</p>
              </div>
            ))}
          </div>
          <button onClick={clearComparison} className="clear-comparison-btn">Clear Comparison</button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
