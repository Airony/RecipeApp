import React from "react";
import styles from "../styles/review.module.scss";

const Review = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h5>John Doe</h5>
        <span aria-hidden> - </span>
        <h5 aria-label="December 12th, 2012">12/12/2012</h5>
      </div>
      <p className={styles.content}>
        Cillum ullamco veniam excepteur fugiat do ea velit do ipsum qui Lorem.
        Velit fugiat ut elit veniam nostrud duis sint eu aute nostrud consequat.
        Ea ut in officia aute cupidatat ullamco id ex est tempor deserunt qui
        nostrud exercitation.
      </p>
      <div className={styles.ratingsContainer}>
        <button className={styles.upvote} aria-label="Upvote comment"></button>
        <button
          className={styles.downvote}
          aria-label="Downvote comment"
        ></button>
        <p>434 points</p>
      </div>
    </div>
  );
};

export default Review;
