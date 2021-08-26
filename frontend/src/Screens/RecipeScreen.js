import axios from "axios";
import React, { useCallback, useEffect, useReducer } from "react";
import { useParams } from "react-router";
import Review from "../Components/Review";
import TextArea from "../Components/TextArea";
import "../styles/recipeScreen.scss";

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

  return (
    <>
      {recipe.isLoading ? (
        <p>Loading</p>
      ) : recipe.error ? (
        <p>
          Error :
          {recipe.error.data.message
            ? recipe.error.data.message
            : "Server error, please try again later."}
        </p>
      ) : (
        <article className="recipe-screen-container">
          <section className="recipe-info">
            <div className="info-container">
              <h1 className="recipe-title">{recipe.data.title}</h1>
              <div className="recipe-author">
                <span>By </span>
                <a className="text-button" href="#">
                  {recipe.data["author_name"]}
                </a>
              </div>
              <h6 className="recipe-post-date">August 1st, 2021</h6>
              <div className="additional-properties">
                <div className="property">
                  <h4 className="property-title">Difficulty: </h4>
                  <h4 className="property-value">
                    {recipe.data["recipe_difficulty"]}
                  </h4>
                </div>
                <div className="property">
                  <h4 className="property-title">Preptime: </h4>
                  <h4 className="property-value">
                    {recipe.data["prep_time"] + "m"}
                  </h4>
                </div>
                <div className="property">
                  <h4 className="property-title">Servings: </h4>
                  <h4 className="property-value">5 - 6</h4>
                </div>
                <div className="property">
                  <h4 className="property-title">Cooktime: </h4>
                  <h4 className="property-value">
                    {recipe.data["cook_time"] + "m"}
                  </h4>
                </div>
              </div>
            </div>
            <div className="recipe-img-container">
              <img
                src={`\\${recipe.data.image}`}
                alt=""
                className="responsive-img"
              />
            </div>
          </section>
          <section className="recipe-data">
            <section className="recipe-description">
              <p className="body-big">{recipe.data.description}</p>
            </section>
            <section className="recipe-instructions">
              <section className="ingredients">
                <h2>Ingredients</h2>
                <hr></hr>
                {recipe.data.ingredients.map((value, index) => {
                  return (
                    <p key={index}>
                      <span className="ingredient-index">{index + 1}/</span>
                      {value}
                    </p>
                  );
                })}
              </section>
              <section className="preparation">
                <h2>Preparation</h2>
                <hr></hr>
                {recipe.data.steps.map((value, index) => {
                  return (
                    <div className="step" key={index}>
                      <h4>Step {index + 1}</h4>
                      <p>{value}</p>
                    </div>
                  );
                })}
                <hr></hr>
              </section>
            </section>
            <section className="write-review">
              <h4>Write a review</h4>
              <TextArea
                placeholder="Write your review"
                maxLength={1000}
              ></TextArea>
            </section>
            <section className="reviews">
              <h2>Reviews (2)</h2>
              <hr></hr>
              <div className="reviews-container">
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
