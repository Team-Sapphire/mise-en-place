import {useState} from 'react';

const RecipeModal = ({setModal, modalVisable, clickedRecipe}) => {

  let [ingredients, setIngredients] = useState([
    "grilled chicken",
    "romaine lettuce",
    "croutons",
    "parmesan cheese",
    "Caesar dressing",
    "bacon",
    "hard-boiled eggs",
    "avocado",
    "tomatoes",
    "cucumbers",
    "red onions",
    "black olives",
    "anchovies"
  ])

  let [instructions, setInstructions] = useState([
    "Preheat oven to 400°F (200°C).",
    "Season chicken breasts with salt and pepper.",
    "Lightly grease a baking dish or pan with oil or non-stick spray.",
    "Place chicken breasts in the baking dish or pan.",
    "Bake in the preheated oven for 25-30 minutes, or until the internal temperature reaches 165°F (74°C) using a meat thermometer.",
    "Remove from oven and let rest for 5 minutes before slicing."
  ])

  let handleClose = () => {
    setModal(false);
  }

  if (!modalVisable) {
    return null;
  }
  console.log(clickedRecipe)
  return (
  <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center text-black z-20">
  <div className="bg-white p-2 rounded w-[70%] h-[70%]">


    <div className="grid lg:grid-cols-6 grid-rows-6 gap-5 h-[100%] w-[100%]">

    <div className="col-span-6 row-span-1 p-4 shadow-lg rounded-md">
      <div className="float-right">
    <button className='bg-rose-500 rounded-full border-2 border-black w-[50px] h-[50px] hover:scale-125 ease-in-out duration-300' onClick={handleClose}>X</button>
      </div>
    <p className='text-8xl'>{clickedRecipe}</p>
    </div>

    <div className="col-span-4 row-span-5 p-4 shadow-lg rounded-md">
      <p>Instructions:</p>
      <ul>
      {instructions.map((step, index) => {
        return <li className='pt-2' key={index}>{index + 1}. {step}</li>
      })}
      </ul>
    </div>

    <div className="col-span-2 row-span-5 p-4 shadow-lg rounded-md">
      <h1>Ingredients:</h1>
      <ul>
      {ingredients.map((ingredient, index) => {
        return <li className='pt-2' key={index}>• {ingredient}</li>
      })}
      </ul>
    </div>
  </div>


  </div>
  </div>
  )
}

export default RecipeModal;