import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import { fetchMovies } from "../services/api";

export default function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search) {
      setLoading(true);
      fetchMovies(search).then((data) => {
        setMovies(data);
        setLoading(false);
      });
    } else {
      setMovies([]);
    }
  }, [search]);

  const filteredMovies = year
    ? movies.filter((movie) => movie.Year.includes(year))
    : movies;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Filter by year..."
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 w-32"
        />
      </div>

      {loading ? (
        <p>Loading movies...</p>
      ) : filteredMovies.length > 0 ? (
        <MovieList movies={filteredMovies} />
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
}
