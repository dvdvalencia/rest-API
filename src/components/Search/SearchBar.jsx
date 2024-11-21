import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("characters");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    onSearch(category, query);
  };

  return (
    <div className="search-bar p-4 bg-gray-800 flex flex-col sm:flex-row items-center">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-600 bg-gray-700 text-white rounded px-4 py-2 mb-2 sm:mb-0 sm:mr-4"
      >
        <option value="characters">Characters</option>
        <option value="comics">Comics</option>
        <option value="events">Events</option>
        <option value="series">Series</option>
        <option value="stories">Stories</option>
      </select>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-600 bg-gray-700 text-white rounded px-4 py-2 w-full sm:w-auto"
      />
      <button
        onClick={handleSearch}
        className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 ml-0 sm:ml-4"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
