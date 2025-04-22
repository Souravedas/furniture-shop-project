import { NavLink, useLocation } from "react-router-dom"
// import { useState } from "react"

const AdminSidebar = () => {
    // const [collapsed, setCollapsed] = useState(false)
    const location = useLocation()

    return (
        <div className="admin-sidebar">
            {/* <div className="toggle-btn" onClick={() => setCollapsed(!collapsed)}> */}
            {/* <div className="toggle-btn">
                <i className="fa-solid fa-bars" />
            </div> */}
            <ul>
                <li className={location.pathname === "/admin" ? "active" : ""}>
                    <NavLink to="/admin">
                        <i className="fa-solid fa-plus" />
                        <span>Add Furniture</span>
                        {/* {!collapsed && <span>Add Furniture</span>} */}
                    </NavLink>
                </li>
                <li className={location.pathname === "/admin/users" ? "active" : ""}>
                    <NavLink to="/admin/users">
                        <i className="fa-solid fa-users" />
                        <span>User Management</span>
                        {/* {!collapsed && <span>User Management</span>} */}
                    </NavLink>
                </li>
                <li className={location.pathname === "/admin/messages" ? "active" : ""}>
                    <NavLink to="/admin/messages">
                        <i className="fa-solid fa-envelope" />
                        <span>Message List</span>
                        {/* {!collapsed && <span>Message List</span>} */}
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default AdminSidebar
