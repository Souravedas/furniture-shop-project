import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FurnitureList = () => {
  const [furniture, setFurniture] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchFurniture = async () => {
        try {
          console.log("Fetching with query:", location.search);
          const response = await fetch(`http://localhost:5000/api/furniture${location.search}`);
          
          if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
          }
      
          const data = await response.json();
          setFurniture(data);
        } catch (error) {
          console.error("Error fetching furniture:", error);
        }
      };
      

    fetchFurniture();
  }, [location.search]);

  return (
    <div>
      <h2>Furniture List</h2>
      <ul>
        {furniture.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FurnitureList;
