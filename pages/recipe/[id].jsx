import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import IngredientList from "../../src/components/recipe/ingredientList.jsx";
import HealthLabels from "../../src/components/recipe/healthLabels.jsx";
import Header from "../../src/components/header/Header.jsx";

import EditIcon from "@mui/icons-material/Edit";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { useUser } from "@auth0/nextjs-auth0/client";

const axios = require("axios");

const RecipePage = () => {
  const { user, error } = useUser();
  // const router = useRouter();

  const [recipeId, setRecipeId] = React.useState(useRouter().query.id);
  const [thisRecipe, setThisRecipe] = React.useState({});
  const [ingredientsByYield, setIngredientsByYield] = React.useState([]);

  const [customize, setCustomize] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [editedInstructions, editInstructions] = React.useState("");
  const [servings, setServings] = React.useState(0);
  //divided recipe amounts by yield and then multiplied by amount of servings the user wants

  // TODO save with the ingredients, originally saves the ai generated instructions but upon editing, update with the newly edited instructions
  const [instructions, setInstructions] = React.useState([]);

  React.useEffect(() => {
    if (instructions.length !== 0) {
      setLoading(false);
    }
  }, [instructions]);

  React.useEffect(() => {
    getRecipe();
  }, []);

  let getRecipeInstructions = (recipe) => {
    if (recipe.label !== undefined) {
      axios
        .get("/api/recipePage/dbInstructions", { params: { id: recipeId } })
        .then((res) => {
          console.log(res.data.data[0].instructions);
          if (res.data.data[0].instructions.length !== 0) {
            let noNNInstructions = [];
            res.data.data[0].instructions.forEach((step) => {
              noNNInstructions.push(
                step.replaceAll(".nn", ".").replaceAll(". nn", ".")
              );
            });
            setInstructions(noNNInstructions);
          } else {
            axios
              .post("/api/recipePage/instructions", {
                prompt: `Give me a recipe for ${recipe.label} with these ingredients ${recipe.ingredientLines} with only instructions written in steps with first step starting with Step 1 and so on`,
              })
              .then((res) => {
                console.log(res.data.text);
                let temp = res.data.text.split("Step");
                setInstructions(temp);
                return temp;
              })
              .then((instructions) => {
                console.log(recipe);
                axios
                  .post("/api/recipePage/dbInstructions", {
                    recipe_id: recipe.uri.split("_")[1],
                    instructions: JSON.stringify(instructions)
                      .replaceAll("[", "{")
                      .replaceAll("]", "}"),
                  })
                  .then((res) => {
                    console.log("successful post");
                  })
                  .catch((err) => {
                    console.log("not successful post", err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // ingredientLines: [
  //   "1/2 cup olive oil",
  //   "5 cloves garlic, peeled",
  //   "2 large russet potatoes, peeled and cut into chunks",
  //   "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
  //   "3/4 cup white wine",
  //   "3/4 cup chicken stock",
  //   "3 tablespoons chopped parsley",
  //   "1 tablespoon dried oregano",
  //   "Salt and pepper",
  //   "1 cup frozen peas, thawed",
  // ],
  let getRecipe = () => {
    //console.log(recipeId);
    axios
      .get("/api/recipePage/recipe", { params: { id: recipeId } })
      .then((res) => {
        console.log(res);
        let recipe = res.data.recipe.recipe;
        localStorage.setItem("recipe", JSON.stringify(recipe));
        setThisRecipe(recipe);
        //console.log(user.sub.slice(14));
        // console.log(user);
        axios
          .get("/api/recipePage/getUserServings", {
            params: { id: user.sub.slice(14) },
          })
          .then((res) => {
            console.log(
              res.data[0].preferences.meals,
              res.data[0].preferences.people
            );
            let ingredientsAfter = [];
            let servings = recipe.yield;
            recipe.ingredientLines.forEach((ingredient) => {
              let temp = ingredient.split(" ");
              for (let i = 0; i < temp.length; i++) {
                if (Number(temp[i])) {
                  temp[i] =
                    (Number(temp[i]) / servings) *
                    (res.data[0].preferences.meals *
                      res.data[0].preferences.people);
                  // multiply by the number of servings they want from user profile
                }
              }
              ingredientsAfter.push(temp.join(" "));
              setServings(
                res.data[0].preferences.meals * res.data[0].preferences.people
              );
            });
            setIngredientsByYield(ingredientsAfter);
          })
          .then(() => {
            getRecipeInstructions(recipe);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let stepList = instructions.slice(1).map((step) => {
    let index = instructions.indexOf(step);
    return <p key={index}>{step}</p>;
  });

  const handleCustomizeClick = (e) => {
    setCustomize(true);
  };

  let newRecipeInstructions = () => {
    axios.post("/api/recipePage/instructionEdit", {
      recipe: {
        name: recipe.label,
        recipe_id: recipe.uri.split("_")[1],
        ingredients: JSON.stringify(recipe.ingredientLines)
          .replaceAll("[", "{")
          .replaceAll("]", "}"),
        instructions: JSON.stringify(instructions)
          .replaceAll("[", "{")
          .replaceAll("]", "}"),
        restrictions: JSON.stringify(recipe.healthLabels)
          .replaceAll("[", "{")
          .replaceAll("]", "}")
          .replaceAll("\\n\\n", ""),
        photos: JSON.stringify({ 0: recipe.image }),
        calorie_count: Math.floor(recipe.calories),
        nutrition: JSON.stringify(recipe.totalNutrients),
        cook_time: recipe.totalTime,
      },
      user: { id: user.sub.slice(14) },
    });
  };
  const handleSaveClick = (e) => {
    // let newInstructionArray = editedInstructions.split("\n");
    // newInstructionArray.unshift("nn");
    // for (let i = 0; i < newInstructionArray.length; i++) {
    //   if (newInstructionArray[i] === "") {
    //     newInstructionArray.splice(i, 1);
    //   }
    // }
    // console.log(newInstructionArray);
    setCustomize(false);
  };

  const handleInstructionEdit = (e) => {
    editInstructions(e.target.innerText);
  };

  if (!loading) {
    return (
      <div className="h-[100vh] overflow-scroll">
        <Header />
        <div className="ml-5 mt-5">
          <h1 className="text-5xl flex items-center gap-10">
            {thisRecipe.label}{" "}
            {
              customize ? (
                <button
                  className="btn btn-m bg-green-600 text-black"
                  onClick={handleSaveClick}
                >
                  <EditIcon />
                  Save
                </button>
              ) : (
                // user ? (
                <button
                  className="btn btn-m btn-primary"
                  onClick={handleCustomizeClick}
                >
                  <EditIcon />
                  Customize
                </button>
              )
              // )
              // : (
              //   <Link href="/api/auth/login">
              //     <button className="btn btn-m btn-primary">
              //       <EditIcon />
              //       Login to Edit
              //     </button>
              //   </Link>
              // )
            }
          </h1>
          <div className="grid grid-cols-8 gap-5 mt-5 mb-5">
            <img
              className="col-span-3  h-[300px] w-[500px] object-contain"
              src={thisRecipe.image}
              alt="recipe picture"
            />
            <div className="col-span-3">
              <h4 className="text-lg font-bold flex justify-between">
                Ingredients{" "}
                {servings && (
                  <p className="font-normal text-s">
                    {" "}
                    {"  "}for {servings} servings
                  </p>
                )}
                {user && (
                  <Link href={`/cart`}>
                    <button className="btn btn-s btn-primary">
                      <ShoppingBasketIcon className="mr-2" /> Buy the
                      ingredients
                    </button>
                  </Link>
                )}
              </h4>
              <IngredientList
                customize={customize}
                ingredientsByYield={ingredientsByYield}
              />
            </div>
            <div className="col-span-2">
              <h4 className="text-m font-bold">Labels:</h4>
              <HealthLabels thisRecipe={thisRecipe} />
            </div>
          </div>
          <div>
            <h2>
              <p className="font-bold text-lg">Instructions: </p>
            </h2>
            <div className="grid grid-cols-2">
              {customize ? (
                <div contenteditable="true" onInput={handleInstructionEdit}>
                  {instructions && stepList}
                </div>
              ) : (
                <div>{instructions && stepList}</div>
              )}
              <div className="flex flex-col">
                <div className="place-self-center font-bold">
                  Nutrition Information (per serving)
                </div>
                <div className="text-xs grid grid-cols-2">
                  <div className="justify-self-end">
                    {Object.values(thisRecipe.totalNutrients)
                      .slice(0, 18)
                      .map((nutrient) => {
                        return (
                          <p key={nutrient.label}>
                            {nutrient.label}:{" "}
                            {Math.floor(nutrient.quantity) / thisRecipe.yield}{" "}
                            {nutrient.unit}
                          </p>
                        );
                      })}
                  </div>
                  <div className="justify-self-center">
                    {Object.values(thisRecipe.totalNutrients)
                      .slice(18)
                      .map((nutrient) => {
                        return (
                          <p key={nutrient.label}>
                            {nutrient.label}:{" "}
                            {Math.floor(nutrient.quantity) / thisRecipe.yield}{" "}
                            {nutrient.unit}
                          </p>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center h-[100vh] w-[100vw]">
        <Header />
        <img src="/assets/preparatio.gif"></img>
      </div>
    );
  }
};

export default RecipePage;
