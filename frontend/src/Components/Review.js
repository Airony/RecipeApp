import React, { useState } from "react";
import styles from "../styles/review.module.scss";
import axios from "axios";

const Review = ({ id, posterId, posterName, content, points, defaultVote }) => {
  const [Vote, setVote] = useState(defaultVote);

  const voteComment = async (newVote) => {
    const oldVote = Vote;
    try {
      if (newVote == Vote) {
        setVote(null);
        await axios.post("/api/comments/vote", { commentId: id, dir: 0 });
        return;
      }
      setVote(newVote);
      await axios.post("/api/comments/vote", {
        commentId: id,
        dir: newVote === true ? 1 : newVote === false ? -1 : 0,
      });
    } catch (error) {
      setVote(oldVote);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h5>{posterName}</h5>
      </div>
      <p className={styles.content}>{content}</p>
      <div className={styles.ratingsContainer}>
        <button
          className={`${styles.upvote} ${Vote ? styles.upvoteSelected : ""}`}
          aria-label="Upvote comment"
          onClick={() => {
            voteComment(true);
          }}
        ></button>
        <button
          className={`${styles.downvote} ${
            Vote === false ? styles.downvoteSelected : ""
          }`}
          aria-label="Downvote comment"
          onClick={() => {
            voteComment(false);
          }}
        ></button>
        <p>
          {points +
            (Vote === true ? 1 : Vote === false ? -1 : 0) +
            (defaultVote === true ? -1 : defaultVote === false ? 1 : 0)}{" "}
          points
        </p>
      </div>
    </div>
  );
};

export default Review;
