import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MovieDetail from "./pages/MovieDetails.jsx";

export default function App() {
  const loc = useLocation();
  const is = (p) => (loc.pathname === p ? "text-blue-600" : "text-slate-700");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight text-blue-600">
            🎬 Movie Reviews
          </Link>
          <nav className="flex gap-6 text-sm font-medium">
            <Link to="/" className={`hover:text-blue-600 ${is("/")}`}>Search</Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 mx-auto max-w-6xl px-4 py-6 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:imdbID" element={<MovieDetail />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500">
          Powered by OMDb API • Reviews stored locally
        </div>
      </footer>
    </div>
  );
}
