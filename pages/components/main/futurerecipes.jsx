import {useState} from 'react';
import Recipe from './recipe.jsx';

let FutureRecipes = ({setClickedRecipe, setModal, recipes, setTodaysRecipe}) => {
  return (
    <>
    <p className="flex justify-center">Future Recipes</p>
    <div>
      {recipes.map((recipe, i) => {
        return <Recipe recipe={recipe} key={i} setClickedRecipe={setClickedRecipe} setModal={setModal} setTodaysRecipe={setTodaysRecipe}/>
      })}
    </div>
      </>
  )
}

export default FutureRecipes;