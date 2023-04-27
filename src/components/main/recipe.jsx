let Recipe = ({recipe, setClickedRecipe, setModal, setTodaysRecipe, clickedRecipe}) => {
  let handleModal = () => {
    setClickedRecipe(recipe);
    setModal(true);
  };
  let regex = recipe.uri ? recipe.uri.match(/recipe_([\w-]+)/)[1] : "";
  let isOrange = recipe === clickedRecipe ? true : false;
  return (
    <div className={isOrange ? "flex flex-row justify-between border-2 border-black rounded-lg mt-2 h-[100px] hover:scale-105 ease-in-out duration-300 bg-orange-500" : "flex flex-row justify-between border-2 border-black rounded-lg mt-2 h-[100px] hover:scale-105 ease-in-out duration-300 bg-gray-800 bg-gray-800"} onClick={(e) =>  {
      setClickedRecipe(recipe)
      setTodaysRecipe(regex)}}>

      <p className={isOrange ? "pt-10 pl-4" : "pt-10 pl-4 text-white"}>{recipe.recipe.label}</p>

      <div className="flex pt-6 pr-4 gap-4">

      <button className='bg-yellow-500 rounded-full border-2 border-black w-[50px] h-[50px] hover:scale-125 ease-in-out duration-300' onClick={handleModal}>?</button>

      <button className='bg-rose-500 rounded-full border-2 border-black w-[50px] h-[50px] hover:scale-125 ease-in-out duration-300'>X</button>
      </div>

    </div>
  )
}

export default Recipe;