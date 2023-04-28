import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../src/components/header/Header.jsx";
import TodaysRecipe from "../src/components/main/todaysrecipe.jsx";
import FutureRecipes from "../src/components/main/futurerecipes.jsx";
import RedirectButtons from "../src/components/main/redirectbuttons.jsx";
import RecipeModal from "../src/components/main/recipemodal.jsx";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
let Main = () => {
  let [modalVisable, setModal] = useState(false);
  let [recipes, setRecipes] = useState([]);
  let [todaysRecipe, setTodaysRecipe] = useState();
  let [clickedRecipe, setClickedRecipe] = useState();
  let [letLoading, setLoading] = useState(true);
  let [fromDatabase, setFromDatabase] = useState(false);


  const { user, error, isLoading } = useUser();
  // useEffect(() =>{
  //   axios.get('http://localhost:3000/api/edamam/edamam')
  //   .then(res => console.log(res.data))
  //   .catch(err => console.log('error getting recipes'))
  // }, [])

  // ${user.sub.slice(14)}
  // c1b55fe4-0a44-444e-96da-4027be248c77
  useEffect(() => {
    let cached = localStorage.getItem("cached");
    if (user) {
      axios.get(`/api/recipes/${user.sub.slice(14)}`)
        .then((data) => {
          console.log('data!', data.data.rows)
          setRecipes(data.data.rows);
          setClickedRecipe(data.data.rows[0]);
          setTodaysRecipe(data.data.recipe_id);
          setLoading(false);
          setFromDatabase(true);
        })
        .catch(err => console.log(err))
    }

    else if (cached) {
      let parseCached = JSON.parse(cached);
      setRecipes(parseCached);
      setClickedRecipe(parseCached[0]);
      setTodaysRecipe(parseCached[0].recipe.uri.match(/recipe_([\w-]+)/)[1]);
      setLoading(false);
    } else {
      axios
        .get("/api/edamam/search")
        .then((res) => {
          localStorage.setItem("cached", JSON.stringify(res.data));
          setRecipes(res.data);
          setClickedRecipe(res.data[0]);
          setTodaysRecipe(res.data[0].recipe.uri.match(/recipe_([\w-]+)/)[1]);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  if (letLoading) {
    return null;
  }

  return (

    <div>
      <Header />
      <div className="grid lg:grid-cols-6 grid-rows-6 gap-5 h-[1200px] w-[100%]">
        <div className="col-span-6 row-span-2 p-4 shadow-lg rounded-md pt-[5%] h-[300px]">
          <TodaysRecipe todaysRecipe={todaysRecipe}
          fromDataBase={fromDatabase} clickedRecipe={clickedRecipe} />
        </div>

        <div className="col-span-4 row-span-4 overflow-hidden overflow-scroll rounded-md shadow-lg">
          <FutureRecipes
          fromDataBase={fromDatabase}
            setModal={setModal}
            setClickedRecipe={setClickedRecipe}
            recipes={recipes}
            setTodaysRecipe={setTodaysRecipe}
            clickedRecipe={clickedRecipe}
            />
        </div>

        <div className="col-span-2 row-span-4 p-4 pt-8 rounded-md shadow-lg">
          <RedirectButtons />
        </div>
      </div>
      <RecipeModal
      fromDataBase={fromDatabase}
        modalVisable={modalVisable}
        setModal={setModal}
        clickedRecipe={clickedRecipe}
        />
    </div>
  );
};

export default Main;
