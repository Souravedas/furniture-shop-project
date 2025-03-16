import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState(""); // Single search field
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?query=${search}`);
    }
  };
  

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for furniture or designer"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Update search value
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
