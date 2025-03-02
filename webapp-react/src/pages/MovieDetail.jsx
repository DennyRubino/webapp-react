import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewForm from "../pages/ReviewForm";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/movies/${id}`)
      .then((response) => {
        const data = { ...response.data, reviews: response.data.reviews || [] };
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore nel caricamento del film:", err);
        setError("Impossibile caricare il film");
        setLoading(false);
      });
  }, [id]);

  const handleReviewAdded = (newReview) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      reviews: [...prevMovie.reviews, newReview],
    }));
  };

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Film non trovato</p>;

  return (
    <div className="container movie-detail">
      <h1>{movie.title}</h1>
      <ReviewForm movieId={id} onReviewAdded={handleReviewAdded} />
      <h2>Recensioni</h2>
      {movie.reviews.length > 0 ? (
        <ul>
          {movie.reviews.map((review) => (
            <li key={review.id} className="review">
              <p>
                <strong>{review.name}</strong> -{" "}
                {new Date(review.updated_at).toLocaleDateString()}
              </p>
              <p>⭐ {review.vote}/5</p>
              <p>{review.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nessuna recensione disponibile</p>
      )}
    </div>
  );
}

export default MovieDetail;
