import axios from "axios";
import React, { useCallback, useEffect, useReducer } from "react";
import ErrorMessage from "./ErrorMessage";
import Review from "./Review";

const COMMENT_COUNT = 10;

const recipeReducer = (state, action) => {
  switch (action.type) {
    case "COMMENTS_FETCH_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "COMMENTS_FETCH_SUCCESS":
      return { ...state, isLoading: false, error: null, data: action.payload };
    default:
      throw new Error("Invalid action type.");
  }
};

const ReviewContainer = ({ recipeId }) => {
  const [comments, dispatchComments] = useReducer(recipeReducer, {
    data: null,
    isLoading: true,
    error: null,
  });

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(
        `/api/comments/getTop?recipeId=${recipeId}&commentCount=${COMMENT_COUNT}`
      );
      dispatchComments({ type: "COMMENTS_FETCH_SUCCESS", payload: res.data });
    } catch (error) {
      dispatchComments({
        type: "COMMENTS_FETCH_FAILURE",
        payload: error.response,
      });
    }
  }, [recipeId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <section>
      {comments.isLoading ? (
        <p>Loading comments....</p>
      ) : comments.error ? (
        <ErrorMessage
          preMessage="Couldn't load comments : "
          error={comments.error}
        />
      ) : (
        <>
          <h2>Recipes ({comments.data.length})</h2>
          <hr />
          <div>
            {comments.data.map((value, index) => {
              return (
                <Review
                  id={value["comment_id"]}
                  posterId={value["user_id"]}
                  posterName={value["full_name"]}
                  content={value.content}
                  points={value.points}
                  defaultVote={value["user_vote"]}
                  key={index}
                />
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default ReviewContainer;
