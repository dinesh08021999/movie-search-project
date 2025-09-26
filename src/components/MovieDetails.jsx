import { useEffect, useState } from "react";

const FALLBACK = "/placeholder-poster.jpg"; // put a placeholder image in public/

export default function MovieDetails({ imdbID, onClose }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "d097f8c2"; // 🔑 Replace with your OMDb API key

  useEffect(() => {
    if (!imdbID) return;

    const fetchMovie = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
        );
        const data = await res.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Failed to fetch movie details");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [imdbID]);

  if (!imdbID) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <div className="flex justify-end p-3">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        {loading && <p className="text-center py-10">Loading...</p>}
        {error && <p className="text-center text-red-500 py-10">{error}</p>}
        {movie && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Poster */}
            <div className="md:col-span-1 flex justify-center">
              <img
                src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK}
                alt={movie.Title}
                className="rounded-lg shadow-md w-64 h-auto"
              />
            </div>

            {/* Details */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold">{movie.Title}</h2>
              <p className="text-gray-600 italic">
                {movie.Year} • {movie.Runtime}
              </p>
              <p>
                <span className="font-semibold">Genre:</span> {movie.Genre}
              </p>
              <p>
                <span className="font-semibold">Director:</span> {movie.Director}
              </p>
              <p>
                <span className="font-semibold">Actors:</span> {movie.Actors}
              </p>
              <p>
                <span className="font-semibold">Plot:</span> {movie.Plot}
              </p>

              {movie.Ratings && movie.Ratings.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-1">Ratings:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {movie.Ratings.map((r, idx) => (
                      <li key={idx}>
                        {r.Source}: {r.Value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
