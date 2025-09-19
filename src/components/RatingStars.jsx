import React from "react";

function RatingStars({ rating }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className="flex">
      {stars.map((star) => (
        <span key={star} className={star <= rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default RatingStars;
