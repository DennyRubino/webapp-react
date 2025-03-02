import React, { useState } from "react";
import axios from "axios";

function ReviewForm({ movieId, onReviewAdded }) {
  const [name, setName] = useState("");
  const [vote, setVote] = useState(1);
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const review = { name, vote, text };

    axios
      .post(`http://localhost:3000/movies/${movieId}/reviews`, review)
      .then((response) => {
        onReviewAdded(response.data);
        setName("");
        setVote(1);
        setText("");
      })
      .catch((error) => {
        console.error("Errore nell'aggiungere la recensione:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="vote">Voto (1-5):</label>
        <input
          type="number"
          id="vote"
          value={vote}
          min="1"
          max="5"
          onChange={(e) => setVote(Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="text">Recensione:</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button type="submit">Invia Recensione</button>
    </form>
  );
}

export default ReviewForm;
