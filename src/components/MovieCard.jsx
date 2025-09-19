import React from "react";

const MovieCard = ({ movie }) => {
  const ratings = JSON.parse(localStorage.getItem(movie.imdbID)) || [];
  const avgRating =
    ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg">{movie.Title}</h2>
        <p className="text-sm text-gray-500">{movie.Year}</p>
        <p className="text-sm mt-1">Genre: {movie.Genre || "N/A"}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 font-bold">{avgRating.toFixed(1)}</span>
          <span className="ml-1 text-gray-500">⭐</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
