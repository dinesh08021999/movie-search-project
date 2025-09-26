import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/omdb.js";
import MovieCard from "../components/MovieCard.jsx";
import TypeFilter from "../components/TypeFilter.jsx";
import Pagination from "../components/Pagination.jsx";

export default function Home() {
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({ Search: [], totalResults: 0 });

  const query = params.get("q") || "";
  const page = Number(params.get("page") || 1);
  const type = params.get("type") || "";

  const totalPages = useMemo(
    () => Math.ceil((Number(data.totalResults) || 0) / 10),
    [data.totalResults]
  );

  useEffect(() => {
    let ignore = false;
    async function run() {
      if (!query) {
        setData({ Search: [], totalResults: 0 });
        setError("");
        return;
      }
      setLoading(true);
      setError("");
      try {
        const res = await searchMovies(query, page, type);
        if (!ignore) {
          if (res.Response === "False") {
            setData({ Search: [], totalResults: 0 });
            setError(res.Error || "No results found");
          } else {
            setData({ Search: res.Search || [], totalResults: res.totalResults || 0 });
          }
        }
      } catch (e) {
        if (!ignore) setError(e.message || "Something went wrong");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => { ignore = true; };
  }, [query, page, type]);

  const onSearch = (e) => {
    e.preventDefault();
    const q = e.currentTarget.search.value.trim();
    setParams({ q, page: "1", type });
  };

  return (
    <section className="space-y-6">
      {/* Controls */}
      <form onSubmit={onSearch} className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2">
        <input
          name="search"
          defaultValue={query}
          placeholder="Search movies…"
          className="w-full rounded-lg border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <TypeFilter
          value={type}
          onChange={(val) => setParams({ q: query, page: "1", type: val })}
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* States */}
      {!query && <p className="text-sm text-slate-500">Start by typing a movie title…</p>}
      {loading && <p className="text-sm text-slate-600 animate-pulse">Loading results…</p>}
      {error && !!query && (
        <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-sm border border-rose-200">
          {error}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {data.Search.map((m) => (
          <Link key={m.imdbID} to={`/movie/${m.imdbID}`}>
            <MovieCard movie={m} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          current={page}
          totalPages={totalPages}
          onChange={(p) => setParams({ q: query, page: String(p), type })}
        />
      )}
    </section>
  );
}
