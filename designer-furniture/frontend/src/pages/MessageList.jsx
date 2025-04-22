import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import AdminSidebar from "../components/AdminSidebar"

const MessageList = () => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get("/api/users", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                })
                const allMessages = res.data.filter(user => user.message)
                setMessages(allMessages)
            } catch {
                toast.error("Failed to fetch messages")
            }
        }

        fetchMessages()
    }, [])

    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar component can be added here */}
            {<AdminSidebar />}
            <div className="message-list" style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
                <h2>User Contact Messages</h2>
                <ul>
                    {messages.map((msg, i) => (
                        <li key={i}>
                            <p><strong>Name:</strong> {msg.name}</p>
                            <p><strong>Email:</strong> {msg.email}</p>
                            <p><strong>Phone:</strong> {msg.phone}</p>
                            <p><strong>Message:</strong> {msg.message}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MessageList
