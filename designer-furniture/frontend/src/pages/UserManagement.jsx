import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import AdminSidebar from "../components/AdminSidebar"
import { confirmAlert } from "react-confirm-alert"

const UserManagement = () => {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/api/users", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setUsers(res.data)
        } catch (error) {
            toast.error("Failed to load users")
        }
    }

    const handleDelete = async (id) => {
        confirmAlert({
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this furniture?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        try {
                            await axios.delete(`/api/users/${id}`, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                },
                            })
                            toast.success("User deleted successfully.")
                            fetchUsers()
                        } catch (error) {
                            toast.error("Error deleting user. Please try again.")
                        }
                    },
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        })
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar component can be added here */}
            {<AdminSidebar />}
            <div className="user-management" style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
                <h2>User Management</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone || "N/A"}</td>
                                <td>{user.isAdmin ? "Yes" : "No"}</td>
                                <td>
                                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserManagement
