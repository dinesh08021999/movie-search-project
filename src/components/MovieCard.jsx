export default function MovieCard({ movie }) {
  return (
    <div className="rounded-xl overflow-hidden border bg-white shadow hover:shadow-lg transition">
      {movie.Poster && movie.Poster !== "N/A" ? (
        <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
      ) : (
        <div className="w-full h-64 grid place-items-center text-slate-400 text-sm">No Poster</div>
      )}
      <div className="p-3">
        <h2 className="text-sm font-semibold truncate">{movie.Title}</h2>
        <p className="text-xs text-slate-500">{movie.Year}</p>
        <span className="inline-block mt-1 text-[10px] px-2 py-1 bg-slate-100 rounded">
          {movie.Type}
        </span>
      </div>
    </div>
  );
}
