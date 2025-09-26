// src/components/MovieGrid.jsx
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies = [], onSelect }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center text-gray-600 py-16">
        No results found. Try another search.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
