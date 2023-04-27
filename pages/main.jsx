import {useState, useEffect} from 'react';
import Link from 'next/link'
import Header from './components/header/Header.jsx';
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
      setLoading(false);
    } else {
      axios.get('/api/edamam/search')
      .then(res => {
        localStorage.setItem('cached', JSON.stringify(res.data))
        setRecipes(res.data);
        setClickedRecipe(res.data[0])
        setTodaysRecipe(res.data[0].recipe.uri.match(/recipe_([\w-]+)/)[1])
        setLoading(false);
      })
      .catch(err => console.log(err))
    }
  }, [])

  if (isLoading) {
    return null
  }

    return (
      <div>
      <Header />
    <div className="grid lg:grid-cols-6 grid-rows-6 gap-5 h-[100%] w-[100%]">

    <div className="col-span-6 row-span-2 p-4 shadow-lg rounded-md pt-[10%]">
      <TodaysRecipe todaysRecipe={todaysRecipe}/>
    </div>

    <div className="col-span-4 row-span-4 p-4 shadow-lg rounded-md">
      <FutureRecipes setModal={setModal} setClickedRecipe={setClickedRecipe} recipes={recipes} setTodaysRecipe={setTodaysRecipe} clickedRecipe={clickedRecipe}/>
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