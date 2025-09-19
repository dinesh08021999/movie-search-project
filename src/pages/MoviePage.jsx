import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/api";

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(id).then((data) => setMovie(data));
  }, [id]);

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{movie.Title}</h1>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
        alt={movie.Title}
        className="w-64 h-96 object-cover mb-4"
      />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
    </div>
  );
}
