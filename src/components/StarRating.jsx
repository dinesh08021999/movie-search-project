import { useMemo } from "react";

export default function StarRating({ value = 0, onChange, readOnly = false, size = "md" }) {
  // value can be decimal (e.g., 3.6 average). We draw filled, half, empty.
  const stars = useMemo(() => {
    const full = Math.floor(value);
    const half = !Number.isNaN(value) && value - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return [
      ...Array(full).fill("full"),
      ...Array(half).fill("half"),
      ...Array(empty).fill("empty"),
    ];
  }, [value]);

  const sizes = { md: "text-xl", lg: "text-2xl" };
  const cls = sizes[size] || sizes.md;

  const handleClick = (i) => {
    if (readOnly || !onChange) return;
    onChange(i + 1);
  };

  return (
    <div className={`flex items-center gap-1 ${readOnly ? "cursor-default" : "cursor-pointer"}`}>
      {stars.map((type, i) => (
        <span
          key={i}
          onClick={() => handleClick(i)}
          className={`${cls} leading-none select-none`}
          title={readOnly ? "" : `${i + 1} star${i ? "s" : ""}`}
        >
          {type === "full" ? "★" : type === "half" ? "⯨" : "☆"}
        </span>
      ))}
    </div>
  );
}
