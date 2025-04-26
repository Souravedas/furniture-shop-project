import React, { useEffect, useState } from "react"
import axios from "axios"
import AdminSidebar from "../components/AdminSidebar"
import { toast } from "react-toastify"

const AdminReviews = () => {
    const [reviews, setReviews] = useState([])

    const fetchReviews = async () => {
        try {
            const res = await axios.get("/api/users/reviews", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            setReviews(res.data)
        } catch (error) {
            toast.error("Failed to fetch reviews")
        }
    }

    const handleDelete = async (createdAt) => {
        try {
            await axios.delete(`/api/users/reviews/${createdAt}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            toast.success("Review deleted successfully")
            fetchReviews()
        } catch (error) {
            toast.error("Failed to delete review")
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    return (
        <div style={{ display: "flex" }}>
            <AdminSidebar />
            <div className="admin-content" style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
                <h2>Reviews Management</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={index}>
                                <td>{review.name}</td>
                                <td>{review.rating} ⭐</td>
                                <td>{review.content}</td>
                                <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleDelete(review.createdAt)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminReviews
