// src/pages/Home.jsx
import { useState } from "react";
import { searchMovies } from "../api";
import { Link } from "react-router-dom";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();
    const results = await searchMovies(query);
    setMovies(results);
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🎬 Movie Search App</h1>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
            <div className="border rounded-lg p-2 hover:shadow-lg">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
                alt={movie.Title}
                className="w-full h-60 object-cover rounded"
              />
              <h2 className="font-semibold mt-2">{movie.Title}</h2>
              <p className="text-sm text-gray-600">{movie.Year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
