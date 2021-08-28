import React from "react";
import styles from "../styles/review.module.scss";

const Review = ({ id, posterId, posterName, content, points }) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h5>{posterName}</h5>
      </div>
      <p className={styles.content}>{content}</p>
      <div className={styles.ratingsContainer}>
        <button className={styles.upvote} aria-label="Upvote comment"></button>
        <button
          className={styles.downvote}
          aria-label="Downvote comment"
        ></button>
        <p>{points} points</p>
      </div>
    </div>
  );
};

export default Review;
