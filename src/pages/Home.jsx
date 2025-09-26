import { useState } from "react";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import MovieDetails from "../components/MovieDetails";

const API_KEY = "d097f8c2"; // 🔑 Replace with your OMDb API key

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // ✅ FIXED
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch movies
  const fetchMovies = async (search, pageNumber = 1) => {
    if (!search) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${pageNumber}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalPages(Math.ceil(data.totalResults / 10));
      } else {
        setMovies([]);
        setTotalPages(1);
        setError(data.Error || "No results found.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies(query, 1);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchMovies(query, newPage);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded-lg p-2 w-64 sm:w-96"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-600">Loading movies...</p>
        )}

        {/* Error */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Movies Grid */}
        {!loading && !error && (
          <MovieGrid movies={movies} onSelect={(m) => setSelectedMovie(m)} />
        )}

        {/* Pagination */}
        {!loading && movies.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        )}
      </main>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetails
          imdbID={selectedMovie.imdbID}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
