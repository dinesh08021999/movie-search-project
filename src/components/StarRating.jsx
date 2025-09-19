import React, { useState } from "react";

const StarRating = ({ rating = 0, onRate }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl px-1 ${
            star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => onRate(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
