// StarRating.jsx
// Reusable star picker. Used in the submission form.
// "value" is the current rating (1-5), "onChange" fires when a star is clicked.

export default function StarRating({ value, onChange }) {
  return (
    <div className="star-rating" role="radiogroup" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= value ? "filled" : ""}`}
          onClick={() => onChange(star)}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          aria-pressed={star === value}
        >
          ★
        </button>
      ))}
    </div>
  );
}
