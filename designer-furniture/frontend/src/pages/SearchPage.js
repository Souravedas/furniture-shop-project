import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchPage = () => {
  const [category, setCategory] = useState("");
  const [furniture, setFurniture] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const response = await axios.get(`/api/furniture?category=${category}`);
        setFurniture(response.data);
      } catch (error) {
        console.error("Error fetching furniture:", error);
      }
    };
  
    if (category) {
      fetchFurniture();
    }
  }, [category]); // ✅ Runs whenever `category` changes  


  // Handle furniture selection for comparison
  const handleSelect = (item) => {
    if (selectedItems.length < 2) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      alert("You can only compare two items at a time!");
    }
  };

  // Clear comparison
  const clearComparison = () => {
    setSelectedItems([]);
  };

  const handleSearch = async (category) => {
    setCategory(category);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must log in first.");
        return;
      }
  
      // Save last search category to the database
      await axios.put(
        "/api/profile/update-search",
        { lastSearchCategory: category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Fetch furniture based on selected category
      const response = await axios.get(`/api/furniture?category=${category}`);
      setFurniture(response.data); // ✅ Update the displayed furniture list
    } catch (error) {
      console.error("Error fetching furniture:", error);
      alert("Failed to update search results.");
    }
  };
  

  return (
    <div>
      <h2>Search & Compare Furniture</h2>
      <select onChange={(e) => handleSearch(e.target.value)}>
  <option value="">All Categories</option>
  <option value="sofa">Sofa</option>
  <option value="table">Table</option>
  <option value="chair">Chair</option>
  <option value="cushion">Cushion</option>
  <option value="living table">Living Table</option>
</select>


      <div>
        {furniture.length > 0 ? (
          furniture.map((item) => (
            <div key={item._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
              <img src={item.image} alt={item.name} style={{ width: "150px" }} />
              <h3>{item.name}</h3>
              <p>Designer: {item.designer}</p>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
              <button onClick={() => window.open(item.link, "_blank")}>View Product</button>
              <button onClick={() => handleSelect(item)}>Compare</button>
            </div>
          ))
        ) : (
          <p>No furniture found.</p>
        )}
      </div>

      {/* Comparison Section */}
      {selectedItems.length === 2 && (
        <div style={{ border: "2px solid #000", padding: "10px", margin: "20px 0" }}>
          <h2>Comparison</h2>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {selectedItems.map((item) => (
              <div key={item._id} style={{ border: "1px solid gray", padding: "10px", width: "45%" }}>
                <img src={item.image} alt={item.name} style={{ width: "100px" }} />
                <h3>{item.name}</h3>
                <p><strong>Designer:</strong> {item.designer}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Price:</strong> ${item.price}</p>
              </div>
            ))}
          </div>
          <button onClick={clearComparison}>Clear Comparison</button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
