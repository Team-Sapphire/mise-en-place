import {useState, useEffect} from 'react';
import Link from 'next/link'
import TodaysRecipe from './components/main/todaysrecipe.jsx';
import FutureRecipes from './components/main/futurerecipes.jsx';
import RedirectButtons from './components/main/redirectbuttons.jsx';
import RecipeModal from './components/main/recipemodal.jsx';
import axios from 'axios';
let Main = () => {
  let [modalVisable, setModal] = useState(false);
  let [recipes, setRecipes] = useState([])
  let [todaysRecipe, setTodaysRecipe] = useState()
  let [clickedRecipe, setClickedRecipe] = useState();
  let [isLoading, setLoading] = useState(true);

  // useEffect(() =>{
    //   axios.get('http://localhost:3000/api/edamam/edamam')
    //   .then(res => console.log(res.data))
    //   .catch(err => console.log('error getting recipes'))
    // }, [])

    useEffect(() =>{
      let cached = localStorage.getItem('cached');
      if (cached) {
      let parseCached = JSON.parse(cached)
      setRecipes(parseCached)
      setClickedRecipe(parseCached[0])
      setTodaysRecipe(parseCached[0].recipe.uri.match(/recipe_([\w-]+)/)[1])
    } else {
      axios.get('http://localhost:3000/api/edamam/search')
      .then(res => {
        let array = res.data
        localStorage.setItem('cached', JSON.stringify(array))
        setRecipes(array);
        setClickedRecipe(array[0])
        todaysRecipe(array[0].recipe.uri.match(/recipe_([\w-]+)/)[1])
      })
      .catch(err => console.log('error getting recipes'))
    }
    setLoading(false);
  }, [])

  if (isLoading) {
    return (
    <p>Loading</p>
    )
  };
  return (
    <div>

    <div className="grid lg:grid-cols-6 grid-rows-6 gap-5 h-[100%] w-[100%]">

    <div className="col-span-6 row-span-2 p-4 shadow-lg rounded-md pt-[10%]">
      <TodaysRecipe todaysRecipe={todaysRecipe}/>
    </div>

    <div className="col-span-4 row-span-4 p-4 shadow-lg rounded-md">
      <FutureRecipes setModal={setModal} setClickedRecipe={setClickedRecipe} recipes={recipes} setTodaysRecipe={setTodaysRecipe}/>
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