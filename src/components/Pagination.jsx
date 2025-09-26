export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1 rounded border bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Prev
      </button>

      {/* Page Info */}
      <span className="text-sm text-gray-700">
        Page {page} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1 rounded border bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  );
}
