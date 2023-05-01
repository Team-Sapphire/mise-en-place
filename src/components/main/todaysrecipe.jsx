import Link from "next/link";
let TodaysRecipe = ({todaysRecipe, clickedRecipe, fromDataBase}) => {

  return (
    <div className="flex justify-between items-center border-2 border-primary rounded-lg">

      <div className="flex rounded-lg pl-10 text-primary text-xl"><p>Todays Recipe: </p>
      </div>
      <div className="flex rounded-lg pl-10 text-primary text-xl">
      <h1> {fromDataBase ? clickedRecipe.label : clickedRecipe.recipe.label}</h1>
      </div>

      <Link href={`/recipe/${todaysRecipe}`} ><div className="flex bg-primary text-secondary rounded-lg shadow-lg h-[100px] w-[120px]"><button className="text-xl">Lets Make It</button></div></Link>

    </div>
  )
}

export default TodaysRecipe;