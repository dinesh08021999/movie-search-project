import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/omdb.js";
import StarRating from "../components/StarRating.jsx";

const LS_KEY = "reviews_v1"; // { [imdbID]: { average, count, my, notes:[{stars,text,date}] } }

export default function MovieDetail() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // local review state
  const [myStars, setMyStars] = useState(0);
  const [myText, setMyText] = useState("");

  const reviews = useMemo(() => {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  }, []);

  const summary = useMemo(() => {
    const r = reviews[imdbID];
    return r ? { average: r.average, count: r.count } : { average: 0, count: 0 };
  }, [reviews, imdbID]);

  useEffect(() => {
    let ignore = false;
    async function run() {
      setLoading(true);
      setErr("");
      try {
        const res = await getMovieDetails(imdbID);
        if (!ignore) {
          if (res.Response === "False") setErr(res.Error || "Movie not found");
          else setMovie(res);
        }
      } catch (e) {
        if (!ignore) setErr(e.message || "Something went wrong");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => { ignore = true; };
  }, [imdbID]);

  const submitReview = (e) => {
    e.preventDefault();
    if (myStars < 1) return alert("Please select a rating ⭐");

    const raw = localStorage.getItem(LS_KEY);
    const store = raw ? JSON.parse(raw) : {};
    const current = store[imdbID] || { average: 0, count: 0, notes: [] };

    const newNotes = [
      { stars: myStars, text: myText.trim(), date: new Date().toISOString() },
      ...current.notes
    ].slice(0, 20);

    const newCount = current.count + 1;
    const newAverage = ((current.average * current.count) + myStars) / newCount;

    store[imdbID] = {
      average: Number(newAverage.toFixed(2)),
      count: newCount,
      notes: newNotes,
    };

    localStorage.setItem(LS_KEY, JSON.stringify(store));
    setMyStars(0);
    setMyText("");
    // force UI to reflect updated summary:
    window.dispatchEvent(new Event("storage"));
    alert("Thanks for your review! ⭐");
  };

  // re-read summary on 'storage' (quick way to refresh derived summary without global state)
  useEffect(() => {
    const onStorage = () => {
      const raw = localStorage.getItem(LS_KEY);
      const next = raw ? JSON.parse(raw) : {};
      const s = next[imdbID];
      if (s) {
        // no explicit state, summary is memoized via reviews; refresh by replacing location hash
        // simplest: trigger rerender via dummy state, but we'll just update myStars noop
        setMyStars((v) => v);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [imdbID]);

  if (loading) return <p className="text-sm">Loading…</p>;
  if (err) return (
    <div className="space-y-3">
      <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-sm border border-rose-200">{err}</div>
      <Link to="/" className="text-blue-600 underline text-sm">← Back</Link>
    </div>
  );
  if (!movie) return null;

  return (
    <article className="grid gap-6 md:grid-cols-3">
      {/* Poster */}
      <div className="md:col-span-1">
        <div className="overflow-hidden rounded-2xl border bg-white shadow">
          {movie.Poster && movie.Poster !== "N/A" ? (
            <img src={movie.Poster} alt={movie.Title} className="w-full h-auto object-cover" />
          ) : (
            <div className="aspect-[2/3] grid place-items-center text-sm text-slate-500">No Poster</div>
          )}
        </div>
      </div>

      {/* Details + Reviews */}
      <div className="md:col-span-2 space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{movie.Title}</h1>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            {movie.Year && <span>{movie.Year}</span>}
            {movie.Rated && movie.Rated !== "N/A" && <span>• {movie.Rated}</span>}
            {movie.Runtime && movie.Runtime !== "N/A" && <span>• {movie.Runtime}</span>}
            {movie.Genre && movie.Genre !== "N/A" && <span>• {movie.Genre}</span>}
          </div>
          {movie.Plot && movie.Plot !== "N/A" && (
            <p className="text-slate-800 leading-relaxed">{movie.Plot}</p>
          )}
          {/* Ratings summary */}
          <div className="flex items-center gap-3">
            <StarRating value={summary.average} readOnly size="lg" />
            <span className="text-sm text-slate-600">{summary.average ? `${summary.average} / 5` : "Not rated yet"} ({summary.count || 0})</span>
          </div>
        </div>

        {/* Review Form */}
        <form onSubmit={submitReview} className="p-4 rounded-xl bg-white border shadow space-y-3">
          <div className="font-semibold">Your Review</div>
          <StarRating value={myStars} onChange={setMyStars} size="lg" />
          <textarea
            value={myText}
            onChange={(e) => setMyText(e.target.value)}
            rows={3}
            placeholder="What did you think?"
            className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700 transition"
            >
              Submit Review
            </button>
            <Link to="/" className="px-4 py-2 rounded-lg bg-slate-100 text-slate-800 text-sm hover:bg-slate-200">
              ← Back
            </Link>
          </div>
        </form>

        {/* Recent Notes */}
        <ReviewNotes imdbID={imdbID} />
      </div>
    </article>
  );
}

function ReviewNotes({ imdbID }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    const store = raw ? JSON.parse(raw) : {};
    setNotes((store[imdbID]?.notes || []).slice(0, 10));
  }, [imdbID]);

  useEffect(() => {
    const onStorage = () => {
      const raw = localStorage.getItem(LS_KEY);
      const store = raw ? JSON.parse(raw) : {};
      setNotes((store[imdbID]?.notes || []).slice(0, 10));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [imdbID]);

  if (!notes.length) return null;

  return (
    <div className="p-4 rounded-xl bg-white border shadow space-y-3">
      <div className="font-semibold">Recent Reviews</div>
      <ul className="space-y-3">
        {notes.map((n, i) => (
          <li key={i} className="border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <StarRating value={n.stars} readOnly />
              <span className="text-xs text-slate-500">
                {new Date(n.date).toLocaleString()}
              </span>
            </div>
            {n.text && <p className="text-sm text-slate-700 mt-2">{n.text}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
