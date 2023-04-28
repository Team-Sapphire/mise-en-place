let Recipe = ({recipe, setClickedRecipe, setModal, setTodaysRecipe, clickedRecipe}) => {
  let handleModal = () => {
    setClickedRecipe(recipe);
    setModal(true);
  };

  let handleRegex = () => {
    console.log('clicked', recipe)
    let uri = recipe.recipe.uri;
    console.log(uri);
    let regex = recipe.recipe.uri.match(/recipe_([\w-]+)/)[1];
    console.log('regex', regex);
    setTodaysRecipe(regex);
  }

  let isOrange = recipe === clickedRecipe ? true : false;
  return (
    <div className={isOrange ? "flex flex-row justify-between border-2 border-black rounded-lg mt-2 h-[100px] hover:scale-105 ease-in-out duration-300 bg-primary" : "flex flex-row justify-between border-2 border-black rounded-lg mt-2 h-[100px] hover:scale-105 ease-in-out duration-300 bg-gray-800 bg-secondary"} onClick={(e) =>  {
      setClickedRecipe(recipe)
      handleRegex()}}>

      <p className={isOrange ? "pt-10 pl-4 text-secondary" : "pt-10 pl-4 text-primary"}>{recipe.recipe.label}</p>

      <div className="flex pt-6 pr-4 gap-4">

      <button className='bg-yellow-500 rounded-full border-2 border-black w-[50px] h-[50px] hover:scale-125 ease-in-out duration-300' onClick={handleModal}>?</button>

      <button className='bg-rose-500 rounded-full border-2 border-black w-[50px] h-[50px] hover:scale-125 ease-in-out duration-300'>X</button>
      </div>

    </div>
  )
}

export default Recipe;