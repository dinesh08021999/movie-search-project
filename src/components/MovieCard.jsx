// src/components/MovieCard.jsx
const FALLBACK = "/placeholder-poster.jpg"; // add a simple 400x600 image in public/

export default function MovieCard({ movie, onSelect }) {
  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK;

  return (
    <button
      onClick={() => onSelect?.(movie)}
      className="group text-left bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden w-full"
    >
      {/* Poster with fixed height to prevent layout shifts */}
      <div className="w-full h-72 bg-gray-100 overflow-hidden">
        <img
          src={poster}
          alt={movie.Title}
          width="400" height="600"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="p-3">
        <h3 className="font-semibold text-sm leading-snug line-clamp-2">
          {movie.Title}
        </h3>
        <div className="mt-1 text-xs text-gray-600 flex items-center justify-between">
          <span>{movie.Year}</span>
          {movie.Type && <span className="uppercase">{movie.Type}</span>}
        </div>
      </div>
    </button>
  );
}
