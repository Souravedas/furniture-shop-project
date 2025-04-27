import React, { useState, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

const SearchPage = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const initialCategory = searchParams.get("category") || "all"

	const [category, setCategory] = useState(initialCategory)
	const [furniture, setFurniture] = useState([])
	const [selectedItems, setSelectedItems] = useState(
		JSON.parse(localStorage.getItem("selectedItems")) || []
	)
	const comparisonRef = useRef(null)
	const [isLoading, setIsLoading] = useState(true)

	// Fetch furniture based on selected category
	useEffect(() => {
		const fetchFurniture = async () => {
			setIsLoading(true); // Start loading
			try {
				const formattedCategory = category.replace(/_/g, " ")
				const endpoint =
					category === "all"
						? `/api/furniture`
						: `/api/furniture?category=${encodeURIComponent(formattedCategory)}`
				const response = await axios.get(endpoint)
				setFurniture(response.data)
			} catch (error) {
				console.error("Error fetching furniture:", error)
			} finally {
				setIsLoading(false); // Stop loading after fetch is done
			}
		}

		fetchFurniture()
	}, [category])


	// Scroll to comparison when two items are selected
	useEffect(() => {
		if (selectedItems.length === 2 && comparisonRef.current) {
			comparisonRef.current.scrollIntoView({ behavior: "smooth" })
		}
	}, [selectedItems])

	useEffect(() => {
		if (category !== "all") {
			localStorage.setItem("lastSearchedCategory", category)
		}
	}, [category])

	// Handle item selection for comparison
	const handleSelect = (item) => {
		if (selectedItems.length === 0) {
			toast.success("Choose another item to compare!")
		}
		if (selectedItems.length < 3) {
			const updatedSelection = [...selectedItems, item]
			setSelectedItems(updatedSelection)
			localStorage.setItem("selectedItems", JSON.stringify(updatedSelection))
		} else {
			toast.error("You can only compare 3 items at a time.")
		}
	}

	// Clear comparison cart
	const clearComparison = () => {
		setSelectedItems([])
		toast.success("Comparison cart has been cleared!")
		localStorage.removeItem("selectedItems")
	}

	return (
		<div className="search-container">
			<h2>Explore & Compare Furniture</h2>

			{/* Category Buttons */}
			<div className="category-buttons">
				{["all", "sofa", "table", "chair", "cushion", "dining table"].map((cat) => (
					<button
						key={cat}
						className={`category-button ${category === cat ? "active" : ""}`}
						onClick={() => setCategory(cat)}
						type="button"
					>
						{cat.charAt(0).toUpperCase() + cat.slice(1)}
					</button>
				))}
			</div>

			{/* Furniture Grid */}
			{isLoading ? (
				<div className="loading-spinner">
					<div className="spinner"></div>
					<p>Loading furniture...</p>
				</div>
			) : (
				<div className="product-grid">
					{furniture.length > 0 ? (
						furniture.map((item) => (
							<div key={item._id} className="product-card">
								<img src={item.image} alt={item.name} />
								<h3>{item.name}</h3>
								<p><strong>Designer:</strong> {item.designer}</p>
								<p><strong>Category:</strong> {item.category}</p>
								<p><strong>Price:</strong> ৳{item.price}</p>
								<div className="product-buttons">
									<button
										type="button"
										onClick={() => window.open(item.link, "_blank")}
									>
										View Product
									</button>
									<button
										type="button"
										onClick={() => handleSelect(item)}
									>
										Compare
									</button>
								</div>
							</div>
						))
					) : (
						<p>No furniture found.</p>
					)}
				</div>
			)}


			{/* Comparison Section */}
			{selectedItems.length > 0 && (
				<div className="comparison-container" ref={comparisonRef}>
					<h2>Comparison</h2>
					<div className="comparison-grid">
						{selectedItems.map((item) => (
							<div key={item._id} className="comparison-card">
								<img src={item.image} alt={item.name} />
								<h3>{item.name}</h3>
								<p><strong>Designer:</strong> {item.designer}</p>
								<p><strong>Category:</strong> {item.category}</p>
								<p><strong>Description:</strong> {item.description}</p>
								<p><strong>Price:</strong> ৳{item.price}</p>
								<div className="product-buttons">
									<button
										type="button"
										onClick={() => {
											window.open(item.link, "_blank")
										}}
									>
										View Product
									</button>
								</div>
							</div>
						))}
					</div>
					<button
						className="clear-comparison-btn"
						type="button"
						onClick={clearComparison}
					>
						Clear Comparison
					</button>
				</div>
			)}
		</div>
	)
}

export default SearchPage
