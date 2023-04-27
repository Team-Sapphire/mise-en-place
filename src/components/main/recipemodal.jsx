import { useState, useEffect } from "react";
import Image from "next/image";
const RecipeModal = ({ setModal, modalVisable, clickedRecipe }) => {
  let [ingredients, setIngredients] = useState(
    clickedRecipe.recipe.ingredientLines
  );
  let [isLoading, setLoading] = useState(true);

  let handleClose = () => {
    setModal(false);
    setLoading(true);
  };

  if (!modalVisable) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center text-black z-20">
      <div className="bg-white p-2 rounded w-[70%] h-[70%]">
        <div className="grid lg:grid-cols-6 grid-rows-6 gap-5 h-[100%] w-[100%]">
          <div className="col-span-6 row-span-1 p-4 shadow-lg rounded-md">
            <div className="float-right">
              <button
                className="bg-rose-500 rounded-full border-2 border-black w-[50px] h-[50px] hover:scale-125 ease-in-out duration-300"
                onClick={handleClose}
              >
                X
              </button>
            </div>
            <p className="text-2xl">{clickedRecipe.recipe.label}</p>
          </div>

          <div className="col-span-4 row-span-5 p-4 shadow-lg rounded-md">
            <Image
              src={clickedRecipe.recipe.image}
              width={500}
              height={500}
              alt="Food Image"
            />
          </div>

          <div className="col-span-2 row-span-5 p-4 shadow-lg rounded-md">
            <h1>Ingredients:</h1>
            <ul>
              {ingredients.map((ingredient, index) => {
                return (
                  <li className="pt-2" key={index}>
                    • {ingredient}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
