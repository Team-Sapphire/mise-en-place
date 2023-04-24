import {useState} from 'react';
import Recipe from './recipe.jsx';

let FutureRecipes = () => {
  let [recipes, setRecipes] = useState(['upcoming', 'recipe', 'suggestions', ':)'])
  return (
    <>
    <p className="flex justify-center">Future Recipes</p>
    <div>
      {recipes.map((recipe, i) => {
        return <Recipe recipe={recipe} key={i}/>
      })}
    </div>
      </>
  )
}

export default FutureRecipes;