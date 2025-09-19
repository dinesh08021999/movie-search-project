import { Link } from "react-router-dom";

export default function MovieList({ movies }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
          <div className="border p-2 rounded hover:shadow-lg transition">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
              alt={movie.Title}
              className="w-full h-64 object-cover mb-2"
            />
            <h2 className="font-bold">{movie.Title}</h2>
            <p>{movie.Year}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
