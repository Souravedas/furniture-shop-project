import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [furniture, setFurniture] = useState([]);
  const [newFurniture, setNewFurniture] = useState({
    name: "",
    designer: "",
    category: "",
    description: "",
    price: "",
    image: "",
    link: "",
  });

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const response = await axios.get("/api/furniture");
        setFurniture(response.data);
      } catch (error) {
        console.error("Error fetching furniture:", error);
      }
    };

    fetchFurniture();
  }, []);

  const handleChange = (e) => {
    setNewFurniture({ ...newFurniture, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/furniture", newFurniture, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Furniture added successfully!");
      window.location.reload();
    } catch (error) {
      alert("Error adding furniture.");
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      {user && user.isAdmin ? (
        <div>
          <h3>Add New Furniture</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Furniture Name" onChange={handleChange} required />
            <input type="text" name="designer" placeholder="Designer Name" onChange={handleChange} required />
            <select name="category" onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="sofa">Sofa</option>
              <option value="table">Table</option>
              <option value="chair">Chair</option>
              <option value="cushion">Cushion</option>
              <option value="living table">Living Table</option>
            </select>
            <textarea name="description" placeholder="Description" onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
            <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required />
            <input type="text" name="link" placeholder="Product Link" onChange={handleChange} required />
            <button type="submit">Add Furniture</button>
          </form>
          <h3>Existing Furniture</h3>
          {furniture.map((item) => (
            <div key={item._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
              <img src={item.image} alt={item.name} style={{ width: "100px" }} />
              <h3>{item.name}</h3>
              <p>Designer: {item.designer}</p>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Access denied. Admins only.</p>
      )}
    </div>
  );
};

export default AdminPanel;
