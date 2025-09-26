export default function Pagination({ current, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 rounded-lg text-sm border shadow-sm ${
            p === current
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white hover:bg-slate-100 text-slate-700"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
