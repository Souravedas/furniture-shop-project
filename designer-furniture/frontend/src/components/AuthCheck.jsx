import { useContext } from 'react'
import { Navigate, NavLink, Outlet } from 'react-router'
import { AuthContext } from '../context/AuthContext'

const AuthCheck = ({ isAdmin = false }) => {

    const { user } = useContext(AuthContext)

    if (!user) return <Navigate to={"/login"} replace={true} />

    // show anyother popups or anything
    if (isAdmin && !user?.isAdmin) {
        return (
            <div>
                <h1>Unauthorized Access</h1>
                <p>You do not have the necessary permissions to access this page.</p>
                <NavLink to="/login" replace={true}>go to login</NavLink>
            </div>
        )
    }
    return <Outlet />
}

export default AuthCheck