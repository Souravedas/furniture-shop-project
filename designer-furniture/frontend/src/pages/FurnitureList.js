import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FurnitureList = () => {
  const [furniture, setFurniture] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchFurniture = async () => {
      const queryParams = new URLSearchParams(location.search);
      const query = queryParams.get("query"); // Get the search query from the URL

      if (!query) return; // If no query, don't fetch anything

      try {
        const response = await fetch(`/search?query=${query}`);
        const data = await response.json();

        if (response.ok) {
          setFurniture(data); // Set furniture data if found
        } else {
          setFurniture([]); // No results
        }
      } catch (error) {
        console.error("Error fetching furniture:", error);
      }
    };

    fetchFurniture(); // Call fetchFurniture when the component mounts or search query changes
  }, [location.search]);

  return (
    <div>
      <h1>Furniture List</h1>
      {furniture.length === 0 ? (
        <p>No furniture found for this search.</p>
      ) : (
        <ul>
          {furniture.map((item) => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <p>Category: {item.category}</p>
              <p>Designer: {item.designer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FurnitureList;
