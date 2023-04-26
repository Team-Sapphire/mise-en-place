import React from "react";
import Image from "next/image";
import IngredientList from "./components/recipe/ingredientList.jsx";
import HealthLabels from "./components/recipe/healthLabels.jsx";
const axios = require("axios");

const RecipePage = () => {
  const [thisRecipe, setThisRecipe] = React.useState({});
  const [ingredientsByYield, setIngredientsByYield] = React.useState([]);

  const [customize, setCustomize] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

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
    // dbTest();
    // setThisRecipe(recipeExample.hits[0].recipe);
    // setInstructions([
    //   "0",
    //   "1: Heat 1/4 cup of the olive oil in a large skillet over medium heat.",
    //   "2: Add the chicken and brown, about 7 minutes. Set aside.",
    //   "3: In a separate large skillet, heat the remaining 1/4 cup olive oil over medium heat. Add the garlic and sauté for about 2 minutes.",
    //   "4: Add the potatoes and cook for about 8 minutes, until tender and golden.",
    //   "5: Add the chicken, wine, chicken stock and oregano and season with salt and pepper to taste. Bring to a boil and reduce the heat to low. Cover and simmer for 15 minutes.",
    //   "6: Add the peas, cover and cook for an additional 5 minutes.",
    //   "7: Sprinkle with the chopped parsley and serve.",
    // ]);
  }, []);

  // TODO currently using temp data but with database, we can start using calls and queries again

  let getRecipeInstructions = (recipe) => {
    console.log(recipe);
    if (recipe.label !== undefined) {
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
                .replaceAll("]", "}"),
              photos: JSON.stringify({ 0: recipe.image }),
              calorie_count: Math.floor(recipe.calories),
              nutrition: JSON.stringify(recipe.totalNutrients),
              cook_time: recipe.totalTime,

              // insert into recipes (name, recipe_id, ingredients, instructions, restrictions, photos, calorie_count, nutrition, cook_time) values ('Chicken Vesuvio', 'b79327d05b8e5b838ad6cfd9r576b30b6', '["1/2 cup olive oil", "5 cloves garlic, peeled", "2 large russet potatoes, peeled and cut into chunks", "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)", "3/4 cup white wine", "3/4 cup chicken stock", "3 tablespoons chopped parsley", "1 tablespoon dried oregano", "Salt and pepper", "1 cup frozen peas, thawed"]',  '{"0", "1: Heat 1/4 cup of the olive oil in a large skillet over medium heat.", "2: Add the chicken and brown, about 7 minutes. Set aside.", "3: In a separate large skillet, heat the remaining 1/4 cup olive oil over medium heat. Add the garlic and sauté for about 2 minutes.", "4: Add the potatoes and cook for about 8 minutes, until tender and golden.", "5: Add the chicken, wine, chicken stock and oregano and season with salt and pepper to taste. Bring to a boil and reduce the heat to low. Cover and simmer for 15 minutes.",  "6: Add the peas, cover and cook for an additional 5 minutes.", "7: Sprinkle with the chopped parsley and serve."}', '{"Mediterranean", "Dairy-Free", "Gluten-Free", "Wheat-Free", "Egg-Free", "Peanut-Free", "Tree-Nut-Free", "Soy-Free", "Fish-Free","Shellfish-Free", "Pork-Free", "Red-Meat-Free", "Crustacean-Free","Celery-Free", "Mustard-Free", "Sesame-Free", "Lupine-Free", "Mollusk-Free", "Kosher"}', '{"0": "https://edamam-product-images.s3.amazonaws.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIHES4nAJTZuyxyapSGQMCDyc77XD82PQviQVEkCiE2j2AiEA84Pp%2Fi28XuGmNcyLiO62sUwbWoUgXENrUOuQF3sErSUqwgUIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDBtX8%2BnwSsmsIA1mviqWBc%2B5gT%2Bnx%2F63jLnjAP5FDCjbOElLP2TtcjGiZl2JQGw4ghs5DeKDx57rJTzMY708Ic8E9qbOpjxPqDXZmLDVD%2FsenLskrwQaolGwMxuaVgoDtaAgTKMfEP407NczjildTuWHLJNZed99s6PZKIQVpPI07MXpvTqHF1nEVwrTRi2TewRHuPkAhtabfAG7xhdTSH3aoqlBTRq%2BYrJYG9RIsS3hSdB4cc0muYg5XJKUF%2FiApbXFtrR3DsS49%2FYXrGzux29GUHnkhLLYVV7pg3VrjtyfscGgWIJGatvXvRlQzXyC%2Bt4MQhp1M1RUmrJjARQnX7TUSyj3s1r4ixgKYgBR58lqydn9v7e6a1hla41pSnA2kZbhCGzagowOGqgb2A07CaQmrUR%2FiqHOrlMHJX8SZ2dHQn%2FkHHcwQM%2BvN3GjUYsfb2BGVET99eUU8Jzf4XY7g0BimH8xCGPvDT6ZVFAY3uc%2FuSZO4WblLjXqdwtGjGyME%2FujubNF0Q5w27X%2FEjpnsYkI%2F8ShwHF5DzDDEd6gDBtNBWyBkoAY4zawzQ87IgwCrpx2l0Z44AHRQDwQN%2FyseGGmqB8d8cWaGaKE9n9pTLu7H55uD1eS5KojjLMqgEdFXVF5NmU9Y2orTuzfN6AT5Yyj9FuL3cddGG8cZSaEgdsMRQNKz4pGGF8oWXlFQ2Mykh%2BC2Xzc6hI6QQXVFLfzlFrLFW%2FO95gmB5RhMh8csLyV%2FxEfvU%2BVL%2BkYwxttEDDVoQYfnhio%2F8bi0IxZZGiUu%2FJ93JnSQBPuXXlihjZfCVjDUpx0Kl8A0xBRTtocI3lhfTXQnNg5vfWh%2B5Gv5uTa6p4%2FPCQe6IjqauoSBKwHH8besz27cWFnOIvILaeQvuxc%2FcDcHJDmMO6RkKIGOrEBvyWWErdBzjfR6yDjsrsXK82tTHY1I8ZAYQDQLzI2meb6P7xXcm1Rm4d4kCKXiVdvSuZTzBdW%2FO0K0tucVF%2BRFyxPFRSo2A7CpDp%2FEB5BVd%2BquX3IxILp796kGWY2kxAfYb%2BzMXlNUjAb550k82Q72EqoLKTTI16kZMA5j593i6vrM6sMcmDPRTK41gnvOXrVDX7BTxIfHtHH7jH2eGbuJHJoPiEJEVy39HWsoeoeN07M&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230422T172420Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFDUNCOV44%2F20230422%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=5992bfae13b3f0cc865d8ac1ccae8c572e9297c8214e60f7d7a6f818d3a36a90"}'::jsonb, 4228.043058200812, '{}'::jsonb, 60)`;
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
  };

  let dbTest = () => {
    axios
      .get("/api/recipePage/dbInstructions", {
        something: "something",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
    // ! the id from Kyle Main page, using a placeholder here
    let id = "e4456795dfe1409f69629df1670a6494";
    axios
      .get("/api/recipePage/recipe", { params: { id: id } })
      .then((res) => {
        // console.log(res.data.recipe);
        let recipe = res.data.recipe.recipe;
        setThisRecipe(res.data.recipe.recipe);
        let ingredientsAfter = [];
        let servings = res.data.recipe.recipe.yield;
        recipe.ingredientLines.forEach((ingredient) => {
          let temp = ingredient.split(" ");
          for (let i = 0; i < temp.length; i++) {
            if (Number(temp[i])) {
              temp[i] = Number(temp[i]) / servings;
              // multiply by the number of servings they want from user profile
            }
          }
          ingredientsAfter.push(temp.join(" "));
        });
        setIngredientsByYield(ingredientsAfter);
        return res.data.recipe.recipe;
      })
      .then((recipe) => {
        getRecipeInstructions(recipe);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let stepList = instructions.slice(1).map((step) => {
    return <p>{step}</p>;
  });

  const handleCustomizeClick = (e) => {
    setCustomize(true);
  };

  const handleSaveClick = (e) => {
    setCustomize(false);
  };

  if (!loading) {
    return (
      <div>
        <h1 className="bg-black h-[50px] text-white">header</h1>
        <div className="ml-5">
          <h1 className="text-5xl flex items-center gap-10">
            {thisRecipe.label}{" "}
            {customize ? (
              <button
                className="btn btn-sm bg-green-600 text-black"
                onClick={handleSaveClick}
              >
                Save
              </button>
            ) : (
              <button className="btn btn-sm" onClick={handleCustomizeClick}>
                Customize
              </button>
            )}
          </h1>
          <div className="grid grid-cols-8 gap-5 mt-5 mb-5">
            <img
              className="col-span-3  h-[300px] w-[500px] object-contain"
              src={thisRecipe.image}
              alt="recipe picture"
            />
            <div className="col-span-3">
              <h4 className="text-lg font-bold flex justify-between">
                Ingredients:
                <button className="btn btn-xs">Buy the ingredients</button>
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
                <div
                  contenteditable="true"
                  // onInput={(e) => editTask(item.id, e.currentTarget.textContent)}
                >
                  {instructions && stepList}
                </div>
              ) : (
                <div>{instructions && stepList}</div>
              )}
              <div className="text-[10px] justify-self-center grid grid-cols-2">
                <div>
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
                <div>
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
    );
  } else {
    return (
      <div className="flex flex-col justify-center">
        <img src="/assets/preparatio.gif"></img>
      </div>
    );
  }
};

export default RecipePage;

let recipeExample = {
  from: 1,
  to: 20,
  count: 10000,
  _links: {
    next: {
      href: "https://api.edamam.com/api/recipes/v2?q=chicken&app_key=a8469835274092492e9b63078ca8b72b&_cont=CHcVQBtNNQphDmgVQntAEX4BYldtBAUCRGRIAmUUZFx2AAIVX3dEA2EUMgQgAQsCF2NHUDdCZ1YhVldTQmJEUGpAZgd6UBFqX3cWQT1OcV9xBB8VADQWVhFCPwoxXVZEITQeVDcBaR4-SQ%3D%3D&type=public&app_id=cc56315d",
      title: "Next page",
    },
  },
  hits: [
    {
      recipe: {
        uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_b79327d05b8e5b838ad6cfd9576b30b6",
        label: "Chicken Vesuvio",
        image:
          "https://plus.unsplash.com/premium_photo-1670006163348-b8eb307a80a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
        images: {
          THUMBNAIL: {
            url: "https://edamam-product-images.s3.amazonaws.com/web-img/e42/e42f9119813e890af34c259785ae1cfb-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIHES4nAJTZuyxyapSGQMCDyc77XD82PQviQVEkCiE2j2AiEA84Pp%2Fi28XuGmNcyLiO62sUwbWoUgXENrUOuQF3sErSUqwgUIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDBtX8%2BnwSsmsIA1mviqWBc%2B5gT%2Bnx%2F63jLnjAP5FDCjbOElLP2TtcjGiZl2JQGw4ghs5DeKDx57rJTzMY708Ic8E9qbOpjxPqDXZmLDVD%2FsenLskrwQaolGwMxuaVgoDtaAgTKMfEP407NczjildTuWHLJNZed99s6PZKIQVpPI07MXpvTqHF1nEVwrTRi2TewRHuPkAhtabfAG7xhdTSH3aoqlBTRq%2BYrJYG9RIsS3hSdB4cc0muYg5XJKUF%2FiApbXFtrR3DsS49%2FYXrGzux29GUHnkhLLYVV7pg3VrjtyfscGgWIJGatvXvRlQzXyC%2Bt4MQhp1M1RUmrJjARQnX7TUSyj3s1r4ixgKYgBR58lqydn9v7e6a1hla41pSnA2kZbhCGzagowOGqgb2A07CaQmrUR%2FiqHOrlMHJX8SZ2dHQn%2FkHHcwQM%2BvN3GjUYsfb2BGVET99eUU8Jzf4XY7g0BimH8xCGPvDT6ZVFAY3uc%2FuSZO4WblLjXqdwtGjGyME%2FujubNF0Q5w27X%2FEjpnsYkI%2F8ShwHF5DzDDEd6gDBtNBWyBkoAY4zawzQ87IgwCrpx2l0Z44AHRQDwQN%2FyseGGmqB8d8cWaGaKE9n9pTLu7H55uD1eS5KojjLMqgEdFXVF5NmU9Y2orTuzfN6AT5Yyj9FuL3cddGG8cZSaEgdsMRQNKz4pGGF8oWXlFQ2Mykh%2BC2Xzc6hI6QQXVFLfzlFrLFW%2FO95gmB5RhMh8csLyV%2FxEfvU%2BVL%2BkYwxttEDDVoQYfnhio%2F8bi0IxZZGiUu%2FJ93JnSQBPuXXlihjZfCVjDUpx0Kl8A0xBRTtocI3lhfTXQnNg5vfWh%2B5Gv5uTa6p4%2FPCQe6IjqauoSBKwHH8besz27cWFnOIvILaeQvuxc%2FcDcHJDmMO6RkKIGOrEBvyWWErdBzjfR6yDjsrsXK82tTHY1I8ZAYQDQLzI2meb6P7xXcm1Rm4d4kCKXiVdvSuZTzBdW%2FO0K0tucVF%2BRFyxPFRSo2A7CpDp%2FEB5BVd%2BquX3IxILp796kGWY2kxAfYb%2BzMXlNUjAb550k82Q72EqoLKTTI16kZMA5j593i6vrM6sMcmDPRTK41gnvOXrVDX7BTxIfHtHH7jH2eGbuJHJoPiEJEVy39HWsoeoeN07M&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230422T172420Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFDUNCOV44%2F20230422%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=fb759aa4032f92c62a70f42cadee695814e6040bb8d72b09284aa9da013205cc",
            width: 100,
            height: 100,
          },
          SMALL: {
            url: "https://edamam-product-images.s3.amazonaws.com/web-img/e42/e42f9119813e890af34c259785ae1cfb-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIHES4nAJTZuyxyapSGQMCDyc77XD82PQviQVEkCiE2j2AiEA84Pp%2Fi28XuGmNcyLiO62sUwbWoUgXENrUOuQF3sErSUqwgUIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDBtX8%2BnwSsmsIA1mviqWBc%2B5gT%2Bnx%2F63jLnjAP5FDCjbOElLP2TtcjGiZl2JQGw4ghs5DeKDx57rJTzMY708Ic8E9qbOpjxPqDXZmLDVD%2FsenLskrwQaolGwMxuaVgoDtaAgTKMfEP407NczjildTuWHLJNZed99s6PZKIQVpPI07MXpvTqHF1nEVwrTRi2TewRHuPkAhtabfAG7xhdTSH3aoqlBTRq%2BYrJYG9RIsS3hSdB4cc0muYg5XJKUF%2FiApbXFtrR3DsS49%2FYXrGzux29GUHnkhLLYVV7pg3VrjtyfscGgWIJGatvXvRlQzXyC%2Bt4MQhp1M1RUmrJjARQnX7TUSyj3s1r4ixgKYgBR58lqydn9v7e6a1hla41pSnA2kZbhCGzagowOGqgb2A07CaQmrUR%2FiqHOrlMHJX8SZ2dHQn%2FkHHcwQM%2BvN3GjUYsfb2BGVET99eUU8Jzf4XY7g0BimH8xCGPvDT6ZVFAY3uc%2FuSZO4WblLjXqdwtGjGyME%2FujubNF0Q5w27X%2FEjpnsYkI%2F8ShwHF5DzDDEd6gDBtNBWyBkoAY4zawzQ87IgwCrpx2l0Z44AHRQDwQN%2FyseGGmqB8d8cWaGaKE9n9pTLu7H55uD1eS5KojjLMqgEdFXVF5NmU9Y2orTuzfN6AT5Yyj9FuL3cddGG8cZSaEgdsMRQNKz4pGGF8oWXlFQ2Mykh%2BC2Xzc6hI6QQXVFLfzlFrLFW%2FO95gmB5RhMh8csLyV%2FxEfvU%2BVL%2BkYwxttEDDVoQYfnhio%2F8bi0IxZZGiUu%2FJ93JnSQBPuXXlihjZfCVjDUpx0Kl8A0xBRTtocI3lhfTXQnNg5vfWh%2B5Gv5uTa6p4%2FPCQe6IjqauoSBKwHH8besz27cWFnOIvILaeQvuxc%2FcDcHJDmMO6RkKIGOrEBvyWWErdBzjfR6yDjsrsXK82tTHY1I8ZAYQDQLzI2meb6P7xXcm1Rm4d4kCKXiVdvSuZTzBdW%2FO0K0tucVF%2BRFyxPFRSo2A7CpDp%2FEB5BVd%2BquX3IxILp796kGWY2kxAfYb%2BzMXlNUjAb550k82Q72EqoLKTTI16kZMA5j593i6vrM6sMcmDPRTK41gnvOXrVDX7BTxIfHtHH7jH2eGbuJHJoPiEJEVy39HWsoeoeN07M&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230422T172420Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFDUNCOV44%2F20230422%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ee781f8c8b9f48b028343d3d25ec874bc965f37679d527eb2a59a3339161a6e0",
            width: 200,
            height: 200,
          },
          REGULAR: {
            url: "https://edamam-product-images.s3.amazonaws.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIHES4nAJTZuyxyapSGQMCDyc77XD82PQviQVEkCiE2j2AiEA84Pp%2Fi28XuGmNcyLiO62sUwbWoUgXENrUOuQF3sErSUqwgUIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDBtX8%2BnwSsmsIA1mviqWBc%2B5gT%2Bnx%2F63jLnjAP5FDCjbOElLP2TtcjGiZl2JQGw4ghs5DeKDx57rJTzMY708Ic8E9qbOpjxPqDXZmLDVD%2FsenLskrwQaolGwMxuaVgoDtaAgTKMfEP407NczjildTuWHLJNZed99s6PZKIQVpPI07MXpvTqHF1nEVwrTRi2TewRHuPkAhtabfAG7xhdTSH3aoqlBTRq%2BYrJYG9RIsS3hSdB4cc0muYg5XJKUF%2FiApbXFtrR3DsS49%2FYXrGzux29GUHnkhLLYVV7pg3VrjtyfscGgWIJGatvXvRlQzXyC%2Bt4MQhp1M1RUmrJjARQnX7TUSyj3s1r4ixgKYgBR58lqydn9v7e6a1hla41pSnA2kZbhCGzagowOGqgb2A07CaQmrUR%2FiqHOrlMHJX8SZ2dHQn%2FkHHcwQM%2BvN3GjUYsfb2BGVET99eUU8Jzf4XY7g0BimH8xCGPvDT6ZVFAY3uc%2FuSZO4WblLjXqdwtGjGyME%2FujubNF0Q5w27X%2FEjpnsYkI%2F8ShwHF5DzDDEd6gDBtNBWyBkoAY4zawzQ87IgwCrpx2l0Z44AHRQDwQN%2FyseGGmqB8d8cWaGaKE9n9pTLu7H55uD1eS5KojjLMqgEdFXVF5NmU9Y2orTuzfN6AT5Yyj9FuL3cddGG8cZSaEgdsMRQNKz4pGGF8oWXlFQ2Mykh%2BC2Xzc6hI6QQXVFLfzlFrLFW%2FO95gmB5RhMh8csLyV%2FxEfvU%2BVL%2BkYwxttEDDVoQYfnhio%2F8bi0IxZZGiUu%2FJ93JnSQBPuXXlihjZfCVjDUpx0Kl8A0xBRTtocI3lhfTXQnNg5vfWh%2B5Gv5uTa6p4%2FPCQe6IjqauoSBKwHH8besz27cWFnOIvILaeQvuxc%2FcDcHJDmMO6RkKIGOrEBvyWWErdBzjfR6yDjsrsXK82tTHY1I8ZAYQDQLzI2meb6P7xXcm1Rm4d4kCKXiVdvSuZTzBdW%2FO0K0tucVF%2BRFyxPFRSo2A7CpDp%2FEB5BVd%2BquX3IxILp796kGWY2kxAfYb%2BzMXlNUjAb550k82Q72EqoLKTTI16kZMA5j593i6vrM6sMcmDPRTK41gnvOXrVDX7BTxIfHtHH7jH2eGbuJHJoPiEJEVy39HWsoeoeN07M&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230422T172420Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFDUNCOV44%2F20230422%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=5992bfae13b3f0cc865d8ac1ccae8c572e9297c8214e60f7d7a6f818d3a36a90",
            width: 300,
            height: 300,
          },
        },
        source: "Serious Eats",
        url: "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
        shareAs:
          "http://www.edamam.com/recipe/chicken-vesuvio-b79327d05b8e5b838ad6cfd9576b30b6/chicken",
        yield: 4,
        dietLabels: ["Low-Carb"],
        healthLabels: [
          "Mediterranean",
          "Dairy-Free",
          "Gluten-Free",
          "Wheat-Free",
          "Egg-Free",
          "Peanut-Free",
          "Tree-Nut-Free",
          "Soy-Free",
          "Fish-Free",
          "Shellfish-Free",
          "Pork-Free",
          "Red-Meat-Free",
          "Crustacean-Free",
          "Celery-Free",
          "Mustard-Free",
          "Sesame-Free",
          "Lupine-Free",
          "Mollusk-Free",
          "Kosher",
        ],
        cautions: ["Sulfites"],
        ingredientLines: [
          "1/2 cup olive oil",
          "5 cloves garlic, peeled",
          "2 large russet potatoes, peeled and cut into chunks",
          "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
          "3/4 cup white wine",
          "3/4 cup chicken stock",
          "3 tablespoons chopped parsley",
          "1 tablespoon dried oregano",
          "Salt and pepper",
          "1 cup frozen peas, thawed",
        ],
        ingredients: [
          {
            text: "1/2 cup olive oil",
            quantity: 0.5,
            measure: "cup",
            food: "olive oil",
            weight: 108,
            foodCategory: "Oils",
            foodId: "food_b1d1icuad3iktrbqby0hiagafaz7",
            image:
              "https://www.edamam.com/food-img/4d6/4d651eaa8a353647746290c7a9b29d84.jpg",
          },
          {
            text: "5 cloves garlic, peeled",
            quantity: 5,
            measure: "clove",
            food: "garlic",
            weight: 15,
            foodCategory: "vegetables",
            foodId: "food_avtcmx6bgjv1jvay6s6stan8dnyp",
            image:
              "https://www.edamam.com/food-img/6ee/6ee142951f48aaf94f4312409f8d133d.jpg",
          },
          {
            text: "2 large russet potatoes, peeled and cut into chunks",
            quantity: 2,
            measure: "<unit>",
            food: "russet potatoes",
            weight: 738,
            foodCategory: "vegetables",
            foodId: "food_brsjy86bq09pzgbmr4ri8bnohrf7",
            image:
              "https://www.edamam.com/food-img/71b/71b3756ecfd3d1efa075874377038b67.jpg",
          },
          {
            text: "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
            quantity: 3.5,
            measure: "pound",
            food: "chicken",
            weight: 1587.5732950000001,
            foodCategory: "Poultry",
            foodId: "food_bmyxrshbfao9s1amjrvhoauob6mo",
            image:
              "https://www.edamam.com/food-img/d33/d338229d774a743f7858f6764e095878.jpg",
          },
          {
            text: "3/4 cup white wine",
            quantity: 0.75,
            measure: "cup",
            food: "white wine",
            weight: 176.39999999999998,
            foodCategory: "wines",
            foodId: "food_bn44h7baron9ufaoxinmya8l0yye",
            image:
              "https://www.edamam.com/food-img/a71/a718cf3c52add522128929f1f324d2ab.jpg",
          },
          {
            text: "3/4 cup chicken stock",
            quantity: 0.75,
            measure: "cup",
            food: "chicken stock",
            weight: 180,
            foodCategory: "canned soup",
            foodId: "food_bptblvzambd16nbhewqmhaw1rnh5",
            image:
              "https://www.edamam.com/food-img/26a/26a10c4cb4e07bab54d8a687ef5ac7d8.jpg",
          },
          {
            text: "3 tablespoons chopped parsley",
            quantity: 3,
            measure: "tablespoon",
            food: "parsley",
            weight: 11.399999999999999,
            foodCategory: "vegetables",
            foodId: "food_b244pqdazw24zobr5vqu2bf0uid8",
            image:
              "https://www.edamam.com/food-img/46a/46a132e96626d7989b4d6ed8c91f4da0.jpg",
          },
          {
            text: "1 tablespoon dried oregano",
            quantity: 1,
            measure: "tablespoon",
            food: "dried oregano",
            weight: 2.9999999997971143,
            foodCategory: "Condiments and sauces",
            foodId: "food_bkkw6v3bdf0sqiazmzyuiax7i8jr",
            image:
              "https://www.edamam.com/food-img/1b0/1b0eaffb1c261606e0d82fed8e9747a7.jpg",
          },
          {
            text: "Salt and pepper",
            quantity: 0,
            measure: null,
            food: "Salt",
            weight: 17.720239769998784,
            foodCategory: "Condiments and sauces",
            foodId: "food_btxz81db72hwbra2pncvebzzzum9",
            image:
              "https://www.edamam.com/food-img/694/6943ea510918c6025795e8dc6e6eaaeb.jpg",
          },
          {
            text: "Salt and pepper",
            quantity: 0,
            measure: null,
            food: "pepper",
            weight: 8.860119884999392,
            foodCategory: "Condiments and sauces",
            foodId: "food_b6ywzluaaxv02wad7s1r9ag4py89",
            image:
              "https://www.edamam.com/food-img/c6e/c6e5c3bd8d3bc15175d9766971a4d1b2.jpg",
          },
          {
            text: "1 cup frozen peas, thawed",
            quantity: 1,
            measure: "cup",
            food: "frozen peas",
            weight: 134,
            foodCategory: "vegetables",
            foodId: "food_aqrct01b4nxw5eaxoo8woaxc3xd7",
            image:
              "https://www.edamam.com/food-img/c91/c9130a361d5c5b279bf48c69e2466ec2.jpg",
          },
        ],
        calories: 4228.043058200812,
        totalWeight: 2976.8664549004047,
        totalTime: 60,
        cuisineType: ["italian"],
        mealType: ["lunch/dinner"],
        dishType: ["main course"],
        totalNutrients: {
          ENERC_KCAL: {
            label: "Energy",
            quantity: 4228.043058200812,
            unit: "kcal",
          },
          FAT: {
            label: "Fat",
            quantity: 274.4489059026023,
            unit: "g",
          },
          FASAT: {
            label: "Saturated",
            quantity: 62.497618998656044,
            unit: "g",
          },
          FATRN: {
            label: "Trans",
            quantity: 1.047163345382,
            unit: "g",
          },
          FAMS: {
            label: "Monounsaturated",
            quantity: 147.39060633938868,
            unit: "g",
          },
          FAPU: {
            label: "Polyunsaturated",
            quantity: 47.35051984782951,
            unit: "g",
          },
          CHOCDF: {
            label: "Carbs",
            quantity: 175.96206666631727,
            unit: "g",
          },
          "CHOCDF.net": {
            label: "Carbohydrates (net)",
            quantity: 156.13025633549864,
            unit: "g",
          },
          FIBTG: {
            label: "Fiber",
            quantity: 19.83181033081862,
            unit: "g",
          },
          SUGAR: {
            label: "Sugars",
            quantity: 16.239344767255698,
            unit: "g",
          },
          "SUGAR.added": {
            label: "Sugars, added",
            quantity: 0,
            unit: "g",
          },
          PROCNT: {
            label: "Protein",
            quantity: 230.72689680763318,
            unit: "g",
          },
          CHOLE: {
            label: "Cholesterol",
            quantity: 815.06238045,
            unit: "mg",
          },
          NA: {
            label: "Sodium",
            quantity: 6888.614561646296,
            unit: "mg",
          },
          CA: {
            label: "Calcium",
            quantity: 400.0807431570531,
            unit: "mg",
          },
          MG: {
            label: "Magnesium",
            quantity: 478.1771035229573,
            unit: "mg",
          },
          K: {
            label: "Potassium",
            quantity: 5918.1808352043345,
            unit: "mg",
          },
          FE: {
            label: "Iron",
            quantity: 22.546435238210286,
            unit: "mg",
          },
          ZN: {
            label: "Zinc",
            quantity: 18.341531378501646,
            unit: "mg",
          },
          P: {
            label: "Phosphorus",
            quantity: 2231.0712550999992,
            unit: "mg",
          },
          VITA_RAE: {
            label: "Vitamin A",
            quantity: 635.3716670147774,
            unit: "µg",
          },
          VITC: {
            label: "Vitamin C",
            quantity: 103.72979744959534,
            unit: "mg",
          },
          THIA: {
            label: "Thiamin (B1)",
            quantity: 1.7264528338354403,
            unit: "mg",
          },
          RIBF: {
            label: "Riboflavin (B2)",
            quantity: 1.9119200245119274,
            unit: "mg",
          },
          NIA: {
            label: "Niacin (B3)",
            quantity: 86.90416982948213,
            unit: "mg",
          },
          VITB6A: {
            label: "Vitamin B6",
            quantity: 6.886357390963229,
            unit: "mg",
          },
          FOLDFE: {
            label: "Folate equivalent (total)",
            quantity: 276.2712108159691,
            unit: "µg",
          },
          FOLFD: {
            label: "Folate (food)",
            quantity: 276.2712108159691,
            unit: "µg",
          },
          FOLAC: {
            label: "Folic acid",
            quantity: 0,
            unit: "µg",
          },
          VITB12: {
            label: "Vitamin B12",
            quantity: 3.34660450586,
            unit: "µg",
          },
          VITD: {
            label: "Vitamin D",
            quantity: 2.1590996812000003,
            unit: "µg",
          },
          TOCPHA: {
            label: "Vitamin E",
            quantity: 19.62869476856695,
            unit: "mg",
          },
          VITK1: {
            label: "Vitamin K",
            quantity: 353.31486385948267,
            unit: "µg",
          },
          "Sugar.alcohol": {
            label: "Sugar alcohol",
            quantity: 0,
            unit: "g",
          },
          WATER: {
            label: "Water",
            quantity: 1738.7966568296217,
            unit: "g",
          },
        },
        totalDaily: {
          ENERC_KCAL: {
            label: "Energy",
            quantity: 211.4021529100406,
            unit: "%",
          },
          FAT: {
            label: "Fat",
            quantity: 422.2290860040035,
            unit: "%",
          },
          FASAT: {
            label: "Saturated",
            quantity: 312.48809499328024,
            unit: "%",
          },
          CHOCDF: {
            label: "Carbs",
            quantity: 58.65402222210575,
            unit: "%",
          },
          FIBTG: {
            label: "Fiber",
            quantity: 79.32724132327448,
            unit: "%",
          },
          PROCNT: {
            label: "Protein",
            quantity: 461.4537936152663,
            unit: "%",
          },
          CHOLE: {
            label: "Cholesterol",
            quantity: 271.68746015,
            unit: "%",
          },
          NA: {
            label: "Sodium",
            quantity: 287.0256067352624,
            unit: "%",
          },
          CA: {
            label: "Calcium",
            quantity: 40.008074315705315,
            unit: "%",
          },
          MG: {
            label: "Magnesium",
            quantity: 113.85169131498982,
            unit: "%",
          },
          K: {
            label: "Potassium",
            quantity: 125.9187411745603,
            unit: "%",
          },
          FE: {
            label: "Iron",
            quantity: 125.25797354561271,
            unit: "%",
          },
          ZN: {
            label: "Zinc",
            quantity: 166.74119435001495,
            unit: "%",
          },
          P: {
            label: "Phosphorus",
            quantity: 318.7244650142856,
            unit: "%",
          },
          VITA_RAE: {
            label: "Vitamin A",
            quantity: 70.59685189053081,
            unit: "%",
          },
          VITC: {
            label: "Vitamin C",
            quantity: 115.25533049955037,
            unit: "%",
          },
          THIA: {
            label: "Thiamin (B1)",
            quantity: 143.8710694862867,
            unit: "%",
          },
          RIBF: {
            label: "Riboflavin (B2)",
            quantity: 147.0707711163021,
            unit: "%",
          },
          NIA: {
            label: "Niacin (B3)",
            quantity: 543.1510614342633,
            unit: "%",
          },
          VITB6A: {
            label: "Vitamin B6",
            quantity: 529.7197993048637,
            unit: "%",
          },
          FOLDFE: {
            label: "Folate equivalent (total)",
            quantity: 69.06780270399227,
            unit: "%",
          },
          VITB12: {
            label: "Vitamin B12",
            quantity: 139.44185441083332,
            unit: "%",
          },
          VITD: {
            label: "Vitamin D",
            quantity: 14.393997874666669,
            unit: "%",
          },
          TOCPHA: {
            label: "Vitamin E",
            quantity: 130.85796512377968,
            unit: "%",
          },
          VITK1: {
            label: "Vitamin K",
            quantity: 294.42905321623556,
            unit: "%",
          },
        },
        digest: [
          {
            label: "Fat",
            tag: "FAT",
            schemaOrgTag: "fatContent",
            total: 274.4489059026023,
            hasRDI: true,
            daily: 422.2290860040035,
            unit: "g",
            sub: [
              {
                label: "Saturated",
                tag: "FASAT",
                schemaOrgTag: "saturatedFatContent",
                total: 62.497618998656044,
                hasRDI: true,
                daily: 312.48809499328024,
                unit: "g",
              },
              {
                label: "Trans",
                tag: "FATRN",
                schemaOrgTag: "transFatContent",
                total: 1.047163345382,
                hasRDI: false,
                daily: 0,
                unit: "g",
              },
              {
                label: "Monounsaturated",
                tag: "FAMS",
                schemaOrgTag: null,
                total: 147.39060633938868,
                hasRDI: false,
                daily: 0,
                unit: "g",
              },
              {
                label: "Polyunsaturated",
                tag: "FAPU",
                schemaOrgTag: null,
                total: 47.35051984782951,
                hasRDI: false,
                daily: 0,
                unit: "g",
              },
            ],
          },
          {
            label: "Carbs",
            tag: "CHOCDF",
            schemaOrgTag: "carbohydrateContent",
            total: 175.96206666631727,
            hasRDI: true,
            daily: 58.65402222210575,
            unit: "g",
            sub: [
              {
                label: "Carbs (net)",
                tag: "CHOCDF.net",
                schemaOrgTag: null,
                total: 156.13025633549864,
                hasRDI: false,
                daily: 0,
                unit: "g",
              },
              {
                label: "Fiber",
                tag: "FIBTG",
                schemaOrgTag: "fiberContent",
                total: 19.83181033081862,
                hasRDI: true,
                daily: 79.32724132327448,
                unit: "g",
              },
              {
                label: "Sugars",
                tag: "SUGAR",
                schemaOrgTag: "sugarContent",
                total: 16.239344767255698,
                hasRDI: false,
                daily: 0,
                unit: "g",
              },
              {
                label: "Sugars, added",
                tag: "SUGAR.added",
                schemaOrgTag: null,
                total: 0,
                hasRDI: false,
                daily: 0,
                unit: "g",
              },
            ],
          },
          {
            label: "Protein",
            tag: "PROCNT",
            schemaOrgTag: "proteinContent",
            total: 230.72689680763318,
            hasRDI: true,
            daily: 461.4537936152663,
            unit: "g",
          },
          {
            label: "Cholesterol",
            tag: "CHOLE",
            schemaOrgTag: "cholesterolContent",
            total: 815.06238045,
            hasRDI: true,
            daily: 271.68746015,
            unit: "mg",
          },
          {
            label: "Sodium",
            tag: "NA",
            schemaOrgTag: "sodiumContent",
            total: 6888.614561646296,
            hasRDI: true,
            daily: 287.0256067352624,
            unit: "mg",
          },
          {
            label: "Calcium",
            tag: "CA",
            schemaOrgTag: null,
            total: 400.0807431570531,
            hasRDI: true,
            daily: 40.008074315705315,
            unit: "mg",
          },
          {
            label: "Magnesium",
            tag: "MG",
            schemaOrgTag: null,
            total: 478.1771035229573,
            hasRDI: true,
            daily: 113.85169131498982,
            unit: "mg",
          },
          {
            label: "Potassium",
            tag: "K",
            schemaOrgTag: null,
            total: 5918.1808352043345,
            hasRDI: true,
            daily: 125.9187411745603,
            unit: "mg",
          },
          {
            label: "Iron",
            tag: "FE",
            schemaOrgTag: null,
            total: 22.546435238210286,
            hasRDI: true,
            daily: 125.25797354561271,
            unit: "mg",
          },
          {
            label: "Zinc",
            tag: "ZN",
            schemaOrgTag: null,
            total: 18.341531378501646,
            hasRDI: true,
            daily: 166.74119435001495,
            unit: "mg",
          },
          {
            label: "Phosphorus",
            tag: "P",
            schemaOrgTag: null,
            total: 2231.0712550999992,
            hasRDI: true,
            daily: 318.7244650142856,
            unit: "mg",
          },
          {
            label: "Vitamin A",
            tag: "VITA_RAE",
            schemaOrgTag: null,
            total: 635.3716670147774,
            hasRDI: true,
            daily: 70.59685189053081,
            unit: "µg",
          },
          {
            label: "Vitamin C",
            tag: "VITC",
            schemaOrgTag: null,
            total: 103.72979744959534,
            hasRDI: true,
            daily: 115.25533049955037,
            unit: "mg",
          },
          {
            label: "Thiamin (B1)",
            tag: "THIA",
            schemaOrgTag: null,
            total: 1.7264528338354403,
            hasRDI: true,
            daily: 143.8710694862867,
            unit: "mg",
          },
          {
            label: "Riboflavin (B2)",
            tag: "RIBF",
            schemaOrgTag: null,
            total: 1.9119200245119274,
            hasRDI: true,
            daily: 147.0707711163021,
            unit: "mg",
          },
          {
            label: "Niacin (B3)",
            tag: "NIA",
            schemaOrgTag: null,
            total: 86.90416982948213,
            hasRDI: true,
            daily: 543.1510614342633,
            unit: "mg",
          },
          {
            label: "Vitamin B6",
            tag: "VITB6A",
            schemaOrgTag: null,
            total: 6.886357390963229,
            hasRDI: true,
            daily: 529.7197993048637,
            unit: "mg",
          },
          {
            label: "Folate equivalent (total)",
            tag: "FOLDFE",
            schemaOrgTag: null,
            total: 276.2712108159691,
            hasRDI: true,
            daily: 69.06780270399227,
            unit: "µg",
          },
          {
            label: "Folate (food)",
            tag: "FOLFD",
            schemaOrgTag: null,
            total: 276.2712108159691,
            hasRDI: false,
            daily: 0,
            unit: "µg",
          },
          {
            label: "Folic acid",
            tag: "FOLAC",
            schemaOrgTag: null,
            total: 0,
            hasRDI: false,
            daily: 0,
            unit: "µg",
          },
          {
            label: "Vitamin B12",
            tag: "VITB12",
            schemaOrgTag: null,
            total: 3.34660450586,
            hasRDI: true,
            daily: 139.44185441083332,
            unit: "µg",
          },
          {
            label: "Vitamin D",
            tag: "VITD",
            schemaOrgTag: null,
            total: 2.1590996812000003,
            hasRDI: true,
            daily: 14.393997874666669,
            unit: "µg",
          },
          {
            label: "Vitamin E",
            tag: "TOCPHA",
            schemaOrgTag: null,
            total: 19.62869476856695,
            hasRDI: true,
            daily: 130.85796512377968,
            unit: "mg",
          },
          {
            label: "Vitamin K",
            tag: "VITK1",
            schemaOrgTag: null,
            total: 353.31486385948267,
            hasRDI: true,
            daily: 294.42905321623556,
            unit: "µg",
          },
          {
            label: "Sugar alcohols",
            tag: "Sugar.alcohol",
            schemaOrgTag: null,
            total: 0,
            hasRDI: false,
            daily: 0,
            unit: "g",
          },
          {
            label: "Water",
            tag: "WATER",
            schemaOrgTag: null,
            total: 1738.7966568296217,
            hasRDI: false,
            daily: 0,
            unit: "g",
          },
        ],
      },
    },
  ],
};
