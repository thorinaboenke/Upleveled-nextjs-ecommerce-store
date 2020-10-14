import React, { useState, useRef } from 'react';
import styles from '../styles/Home.module.css';
function Review({ rev }) {
  const [text, setText] = useState(rev.reviewText);
  const [rating, setRating] = useState(rev.rating);
  const [editReview, setEditReview] = useState(false);

  const inputRating = useRef(rev.rating);
  const inputText = useRef(rev.reviewText);
  return (
    <>
      {!editReview ? (
        <div>{rev.rating}/5 Stars</div>
      ) : (
        <input
          type="number"
          min={1}
          max={5}
          defaultValue={rev.rating}
          onChange={(e) => setRating(e.currentTarget.value)}
        />
      )}
      {!editReview ? (
        <div>{rev.reviewText}</div>
      ) : (
        <input
          type="text"
          defaultValue={rev.reviewText}
          onChange={(e) => setText(e.currentTarget.value)}
        />
      )}
      <div className={styles.editbuttons}>
        {editReview && (
          <button
            onClick={async () => {
              await fetch(`/api/reviews/${rev.reviewId}`, {
                method: 'DELETE',
              });
            }}
          >
            Delete
          </button>
        )}
        <button onClick={() => setEditReview(!editReview)}>
          {!editReview ? 'Edit' : 'Cancel'}
        </button>
        {editReview && (
          <button
            onClick={async () => {
              await fetch(`/api/reviews/${rev.reviewId}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  review: { reviewText: text, rating: rating },
                }),
              });
              console.log(
                JSON.stringify({
                  review: { reviewText: text, rating: rating },
                }),
              );
              setEditReview(!editReview);
            }}
          >
            Save Changes
          </button>
        )}
      </div>
    </>
  );
}

export default Review;
