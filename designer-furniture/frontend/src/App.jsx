import { Route, Routes } from 'react-router'

// layouts
import MainLayout from './components/layouts/MainLayout'

// pages
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import ProfilePage from "./pages/ProfilePage"
import AdminPanel from './pages/AdminPanel'
import SearchPage from "./pages/SearchPage"
import ForgotPassword from './pages/ForgotPassword'
import VerifyEmailSuccess from './pages/VerifyEmailSuccess'

// components
import AuthCheck from './components/AuthCheck'



const App = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="search" element={<SearchPage />} />
				<Route element={<AuthCheck />}>
					<Route path="profile" element={<ProfilePage />} />
				</Route>
				<Route element={<AuthCheck isAdmin={true} />}>
					<Route path="admin">
						<Route index element={<AdminPanel />} />
						{/* <Route path="settings" element={<AdminPanel />} /> */}
					</Route>
				</Route>
				<Route path="forgot-password" element={<ForgotPassword />} />
				<Route path='verify-email-success' element={<VerifyEmailSuccess />} />
			</Route>
		</Routes>
	)
}

export default App