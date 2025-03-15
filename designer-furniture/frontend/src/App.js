import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Import the HomePage
import FurnitureList from "./pages/FurnitureList";
import FurnitureDetail from "./pages/FurnitureDetail";

function App() {
    return (
        <Router>
            <Routes>
                {/* Home Page with search */}
                <Route path="/" element={<HomePage />} />

                {/* Furniture List (after search) */}
                <Route path="/search" element={<FurnitureList />} />

                {/* Furniture Detail Page */}
                <Route path="/furniture/:id" element={<FurnitureDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
