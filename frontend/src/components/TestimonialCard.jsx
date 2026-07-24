// TestimonialCard.jsx
// Displays a single testimonial. Used on the public Wall page.
// "children" lets the Dashboard reuse this same card but add its own approve/reject buttons underneath.

export default function TestimonialCard({ testimonial, children }) {
  const { name, company, message, rating, photo_url } = testimonial;

  return (
    <div className="card">
      <div className="card-stars" aria-label={`${rating} out of 5 stars`}>
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>
      <p className="card-message">"{message}"</p>
      <div className="card-author">
        {photo_url && <img className="card-avatar" src={photo_url} alt={name} />}
        <div>
          <div className="card-name">{name}</div>
          {company && <div className="card-company">{company}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}
