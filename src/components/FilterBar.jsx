import React, { useState } from "react";

const FilterBar = ({ genres, onFilter }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState(0);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-2 bg-gray-50 rounded-md shadow">
      {/* Genre Filter */}
      <select
        className="border p-2 rounded w-full sm:w-auto"
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {/* Minimum Rating Filter */}
      <select
        className="border p-2 rounded w-full sm:w-auto"
        value={minRating}
        onChange={(e) => setMinRating(Number(e.target.value))}
      >
        <option value={0}>All Ratings</option>
        <option value={1}>1 ⭐ & up</option>
        <option value={2}>2 ⭐ & up</option>
        <option value={3}>3 ⭐ & up</option>
        <option value={4}>4 ⭐ & up</option>
        <option value={5}>5 ⭐ only</option>
      </select>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => onFilter({ genre: selectedGenre, rating: minRating })}
      >
        Apply
      </button>
    </div>
  );
};

export default FilterBar;
