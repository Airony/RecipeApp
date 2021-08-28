import axios from "axios";
import React, { useCallback, useEffect, useReducer } from "react";
import { useParams } from "react-router";
import Review from "../Components/Review";
import TextArea from "../Components/TextArea";
import sharedStyles from "../styles/sharedStyles.module.scss";
import styles from "../styles/recipeScreen.module.scss";

const recipeReducer = (state, action) => {
  switch (action.type) {
    case "RECIPE_FETCH_INIT":
      return { ...state, isLoading: true, error: null };
    case "RECIPE_FETCH_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "RECIPE_FETCH_SUCCESS":
      return { ...state, isLoading: false, error: null, data: action.payload };
    default:
      throw new Error("Invalid action type.");
  }
};

const RecipeScreen = (props) => {
  const { id } = useParams();
  const [recipe, dispatchRecipe] = useReducer(recipeReducer, {
    data: null,
    isLoading: true,
    error: null,
  });

  const fetchRecipe = useCallback(async () => {
    try {
      let response = await axios.get(`/api/recipes/${id}`);
      dispatchRecipe({ type: "RECIPE_FETCH_SUCCESS", payload: response.data });
    } catch (error) {
      dispatchRecipe({ type: "RECIPE_FETCH_FAILURE", payload: error.response });
    }
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  const handleCommentSubmit = (value) => {
    axios.post("/api/comments/", { recipeId: id, comment: value });
  };

  return (
    <>
      {recipe.isLoading ? (
        <p>Loading</p>
      ) : recipe.error ? (
        <ErrorMessage
          preMessage="Couldn't load recipe : "
          error={recipe.error}
        ></ErrorMessage>
      ) : (
        <article className={styles.container}>
          <section className={styles.info}>
            <div className={styles.infoContainer}>
              <h1 className={styles.title}>{recipe.data.title}</h1>
              <div className={styles.author}>
                <span>By </span>
                <a className={sharedStyles.textButton} href="#">
                  {recipe.data["author_name"]}
                </a>
              </div>
              <h6 className={styles.postDate}>August 1st, 2021</h6>
              <div className={styles.additionalProperties}>
                <div className={styles.property}>
                  <h4 className={styles.propertyTitle}>Difficulty: </h4>
                  <h4 className={styles.propertyValue}>
                    {recipe.data["recipe_difficulty"]}
                  </h4>
                </div>
                <div className={styles.property}>
                  <h4 className={styles.propertyTitle}>Preptime: </h4>
                  <h4 className={styles.propertyValue}>
                    {recipe.data["prep_time"] + "m"}
                  </h4>
                </div>
                <div className={styles.property}>
                  <h4 className={styles.propertyTitle}>Servings: </h4>
                  <h4 className={styles.propertyValue}>5 - 6</h4>
                </div>
                <div className={styles.property}>
                  <h4 className={styles.propertyTitle}>Cooktime: </h4>
                  <h4 className={styles.propertyValue}>
                    {recipe.data["cook_time"] + "m"}
                  </h4>
                </div>
              </div>
            </div>
            <div className={styles.imgContainer}>
              <img
                src={`\\${recipe.data.image}`}
                alt=""
                className={sharedStyles.responsiveImg}
              />
            </div>
          </section>
          <section className={styles.data}>
            <section className={styles.description}>
              <p className="body-big">{recipe.data.description}</p>
            </section>
            <section>
              <section className={styles.ingredients}>
                <h2>Ingredients</h2>
                <hr></hr>
                {recipe.data.ingredients.map((value, index) => {
                  return (
                    <p key={index}>
                      <span className={styles.ingredientIndex}>
                        {index + 1}/
                      </span>
                      {value}
                    </p>
                  );
                })}
              </section>
              <section>
                <h2>Preparation</h2>
                <hr></hr>
                {recipe.data.steps.map((value, index) => {
                  return (
                    <div key={index}>
                      <h4>Step {index + 1}</h4>
                      <p>{value}</p>
                    </div>
                  );
                })}
                <hr></hr>
              </section>
            </section>
            <section>
              <h4>Write a review</h4>
              <TextArea
                placeholder="Write your review"
                maxLength={1000}
                onSubmit={handleCommentSubmit}
              ></TextArea>
            </section>
            <section>
              <h2>Reviews (2)</h2>
              <hr></hr>
              <div>
                <Review></Review>
                <Review></Review>
              </div>
            </section>
          </section>
        </article>
      )}
    </>
  );
};

export default RecipeScreen;
