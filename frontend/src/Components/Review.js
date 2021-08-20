import React from "react";
import "../styles/review.scss";

const Review = () => {
  return (
    <div className="review-container">
      <div className="review-info">
        <h5>John Doe</h5>
        <span aria-hidden> - </span>
        <h5 aria-label="December 12th, 2012">12/12/2012</h5>
      </div>
      <p className="review-text">
        Cillum ullamco veniam excepteur fugiat do ea velit do ipsum qui Lorem.
        Velit fugiat ut elit veniam nostrud duis sint eu aute nostrud consequat.
        Ea ut in officia aute cupidatat ullamco id ex est tempor deserunt qui
        nostrud exercitation.
      </p>
      <div className="review-ratings-container">
        <button className="upvote-review" aria-label="Upvote comment"></button>
        <button
          className="downvote-review"
          aria-label="Upvote comment"
        ></button>
        <p className="numPoints">434 points</p>
      </div>
    </div>
  );
};

export default Review;
