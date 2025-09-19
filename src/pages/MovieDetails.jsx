// src/pages/MovieDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../api";

export default function MovieDetails() {
  const { id } = useParams(); // imdbID from the URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
        alt={movie.Title}
        className="w-64 rounded-lg mb-4 shadow"
      />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Language:</strong> {movie.Language}</p>
      <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
    </div>
  );
}
