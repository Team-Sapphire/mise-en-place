import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  recipe: {},
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipeState(state, action) {
      state.recipe = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.recipe,
      };
    },
  },
});

export const { setRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;
