import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSearch = () => {
        const filters = {
            search: search.trim(),
            category,
            minPrice,
            maxPrice,
        };
        console.log("Applied Filters:", filters); // Debugging log
        onSearch(filters); // Ensure this is correctly passed to parent
    };

    return (
        <div className="search-bar">
            <input
                id="searchBox"
                type="text"
                placeholder="Search furniture..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select id="categorySelect" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="chair">Chair</option>
                <option value="sofa">Sofa</option>
                <option value="table">Table</option>
            </select>
            <input
                id="minPrice"
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
                id="maxPrice"
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
