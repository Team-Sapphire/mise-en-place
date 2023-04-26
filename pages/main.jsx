import {useState} from 'react';
import Link from 'next/link'
import TodaysRecipe from './components/main/todaysrecipe.jsx';
import FutureRecipes from './components/main/futurerecipes.jsx';
import RedirectButtons from './components/main/redirectbuttons.jsx';
import RecipeModal from './components/main/recipemodal.jsx';
let Main = () => {
  let [modalVisable, setModal] = useState(false);
  let [clickedRecipe, setClickedRecipe] = useState('');
  let [recipes, setRecipes] = useState(['upcoming', 'recipe', 'suggestions', ':)'])
  let [todaysRecipe, setTodaysRecipe] = useState(recipes[0])

  return (
    <div>

    <div className="grid lg:grid-cols-6 grid-rows-6 gap-5 h-[100%] w-[100%]">

    <div className="col-span-6 row-span-2 p-4 shadow-lg rounded-md pt-[10%]">
      <TodaysRecipe />
    </div>

    <div className="col-span-4 row-span-4 p-4 shadow-lg rounded-md">
      <FutureRecipes setModal={setModal} setClickedRecipe={setClickedRecipe} recipes={recipes}/>
    </div>

    <div className="col-span-2 row-span-4 p-4 shadow-lg rounded-md pt-12">
      <RedirectButtons />
    </div>
  </div>
  <RecipeModal modalVisable={modalVisable} setModal={setModal} clickedRecipe={clickedRecipe}/>
  </div>
  )
}

export default Main;