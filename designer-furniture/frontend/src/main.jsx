import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<App />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	</StrictMode>,
)
