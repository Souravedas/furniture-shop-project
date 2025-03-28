import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

const AdminPanel = () => {
	const { user } = useContext(AuthContext)
	const [furniture, setFurniture] = useState([])
	const [newFurniture, setNewFurniture] = useState({
		name: "",
		designer: "",
		category: "",
		description: "",
		price: "",
		image: "",
		link: "",
	})
	const [editingId, setEditingId] = useState(null)

	useEffect(() => {
		fetchFurniture()
	}, [])

	const fetchFurniture = async () => {
		try {
			const response = await axios.get("/api/furniture")
			setFurniture(response.data);
		} catch (error) {
			console.error("Error fetching furniture:", error)
		}
	}

	const handleChange = (e) => {
		setNewFurniture({ ...newFurniture, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (editingId) {
				await axios.put(`/api/furniture/${editingId}`, newFurniture, {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				})
			} else {
				await axios.post("/api/furniture", newFurniture, {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				})
			}

			alert(editingId ? "Furniture updated successfully!" : "Furniture added successfully!")
			setNewFurniture({ name: "", designer: "", category: "", description: "", price: "", image: "", link: "" })
			setEditingId(null)
			fetchFurniture()
		} catch (error) {
			alert("Error adding/updating furniture.")
		}
	}

	const handleEdit = (item) => {
		setNewFurniture(item)
		setEditingId(item._id)
	}

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this furniture?")) {
			try {
				await axios.delete(`/api/furniture/${id}`, {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				})
				fetchFurniture()
			} catch (error) {
				alert("Error deleting furniture.")
			}
		}
	}

	return (
		<div className="admin-panel">
			<h2 className="admin-title">Admin Panel</h2>
			{user && user.isAdmin ? (
				<div>
					{/* Add New Furniture Form */}
					<div className="admin-form-container">
						<h3>{editingId ? "Edit Furniture" : "Add New Furniture"}</h3>
						<form onSubmit={handleSubmit} className="admin-form">
							<div className="form-group">
								<input type="text" name="name" placeholder="Furniture Name" value={newFurniture.name} onChange={handleChange} required />
								<input type="text" name="designer" placeholder="Designer Name" value={newFurniture.designer} onChange={handleChange} required />
							</div>

							<div className="form-group">
								<select name="category" value={newFurniture.category} onChange={handleChange} required>
									<option value="">Select Category</option>
									<option value="sofa">Sofa</option>
									<option value="table">Table</option>
									<option value="chair">Chair</option>
									<option value="cushion">Cushion</option>
									<option value="dining table">Dining Table</option>
								</select>
								<input type="number" name="price" placeholder="Price ($)" value={newFurniture.price} onChange={handleChange} required />
							</div>

							<textarea name="description" placeholder="Furniture Description" value={newFurniture.description} onChange={handleChange} required />

							<div className="form-group">
								<input type="text" name="image" placeholder="Image URL" value={newFurniture.image} onChange={handleChange} required />
								<input type="text" name="link" placeholder="Product Link" value={newFurniture.link} onChange={handleChange} required />
							</div>

							<button type="submit" className="add-furniture-btn">{editingId ? "Update Furniture" : "Add Furniture"}</button>
						</form>
					</div>

					<h3 className="admin-section-title">Existing Furniture</h3>
					<div className="admin-furniture-grid">
						{furniture.length > 0 ? (
							furniture.map((item) => (
								<div key={item._id} className="admin-furniture-card">
									<div className="image-wrapper">
										<img src={item.image} alt={item.name} />
									</div>
									<div className="furniture-info">
										<h3>{item.name}</h3>
										<p><strong>Designer:</strong> {item.designer}</p>
										<p><strong>Category:</strong> {item.category}</p>
										<p><strong>Price:</strong> ${item.price}</p>
										<button onClick={() => handleEdit(item)} className="edit-btn">Edit</button>
										<button onClick={() => handleDelete(item._id)} className="delete-btn">Delete</button>
									</div>
								</div>
							))
						) : (
							<p>No furniture available.</p>
						)}
					</div>
				</div>
			) : (
				<p className="admin-access-denied">Access denied. Admins only.</p>
			)}
		</div>
	)
}

export default AdminPanel