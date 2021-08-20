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
    data: [],
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
    <article className="recipe-screen-container">
      <section className="recipe-info">
        <div className="info-container">
          <h1 className="recipe-title">Vegetarian Italian Style Pizza</h1>
          <div className="recipe-author">
            <span>By </span>
            <a className="text-button" href="#">
              Abderraouf Mouhoum
            </a>
          </div>
          <h6 className="recipe-post-date">August 1st, 2021</h6>
          <div className="additional-properties">
            <div className="property">
              <h4 className="property-title">Difficulty: </h4>
              <h4 className="property-value">Easy</h4>
            </div>
            <div className="property">
              <h4 className="property-title">Preptime: </h4>
              <h4 className="property-value">90m</h4>
            </div>
            <div className="property">
              <h4 className="property-title">Servings: </h4>
              <h4 className="property-value">5 - 6</h4>
            </div>
            <div className="property">
              <h4 className="property-title">Cooktime: </h4>
              <h4 className="property-value">120m</h4>
            </div>
          </div>
        </div>
        <div className="recipe-img-container">
          <img src="../pizza-image.jpg" alt="" className="responsive-img" />
        </div>
      </section>
      <section className="recipe-data">
        <section className="recipe-description">
          <p className="body-big">
            Tempor consequat ut elit quis tempor deserunt. Culpa mollit laborum
            veniam mollit sit mollit cupidatat exercitation ut fugiat anim ut
            consectetur proident. Officia esse esse proident nulla laborum
            labore. Ea occaecat minim dolore consectetur deserunt nulla. Id id
            Lorem laborum in irure do sint laborum aute ipsum Lorem proident.
            Laborum pariatur fugiat adipisicing deserunt. Fugiat ex excepteur
            irure voluptate eu eu elit aute consequat.
          </p>
        </section>
        <section className="recipe-instructions">
          <section className="ingredients">
            <h2>Ingredients</h2>
            <hr></hr>
            <p>
              <span className="ingredient-index">1/</span> Reprehenderit veniam
              ut ipsum ipsum officia.
            </p>
            <p>
              <span className="ingredient-index">2/</span>
              Fugiat aliqua elit cupidatat est quis dolor est nisi laborum
              cillum.
            </p>
            <p>
              <span className="ingredient-index">3/</span>
              Culpa in ut minim exercitation minim nulla cillum id aute culpa.
            </p>
            <p>Sint irure fugiat irure minim sint ea velit ad do fugiat.</p>
            <p>
              <span className="ingredient-index">4/</span>
              Non minim duis consectetur cillum nostrud quis aliquip duis cillum
              pariatur.
            </p>
          </section>
          <section className="preparation">
            <h2>Preparation</h2>
            <hr></hr>

            <div className="step">
              <h4>Step 1</h4>
              <p>
                Proident consectetur aliqua labore officia cillum voluptate ea
                aliqua sit. Tempor ea minim aute duis do ad ea eiusmod esse
                incididunt mollit eiusmod pariatur. Ea consectetur est cupidatat
                elit ipsum eu laborum ut duis non duis veniam non ea. Ea laborum
                ea voluptate minim elit deserunt duis ex aliquip consequat do
                Lorem aliqua. Amet pariatur id deserunt anim et commodo. Sunt id
                eu do irure minim adipisicing dolor nisi cillum officia ut nisi
                non minim.
              </p>
            </div>
            <div className="step">
              <h4>Step 2</h4>
              <p>
                Pariatur fugiat sunt mollit sit excepteur et et fugiat.Dolore
                mollit velit ipsum enim laboris cupidatat est consequat elit
                nostrud incididunt ipsum est proident.
              </p>
            </div>
            <div className="step">
              <h4>Step 3</h4>
              <p>
                Do commodo minim esse aliqua irure excepteur ut incididunt sint
                ex.Quis reprehenderit et tempor fugiat pariatur id mollit
                occaecat reprehenderit magna ullamco ut consectetur do.Do veniam
                occaecat officia irure esse nulla commodo tempor ullamco aliqua
                sit.Sunt duis cupidatat exercitation excepteur ea culpa
                consequat commodo Lorem.
              </p>
            </div>
            <hr></hr>
          </section>
        </section>
        <section className="write-review">
          <h4>Write a review</h4>
          <TextArea placeholder="Write your review" maxLength={1000}></TextArea>
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
  );
};

export default RecipeScreen;
