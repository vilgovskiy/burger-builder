import * as ActionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingredientName) => {
  return {
    type: ActionTypes.ADD_INGREDIENT,
    ingredientName: ingredientName,
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: ActionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredientName,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: ActionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return { type: ActionTypes.FETCH_INGREDIENTS_FAILED };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
