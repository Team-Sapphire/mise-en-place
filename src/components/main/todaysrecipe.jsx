import Link from "next/link";
let TodaysRecipe = ({todaysRecipe}) => {
  return (

    <div className="flex justify-between items-center border-2 border-primary rounded-lg h-[100%]">

      <div className="flex rounded-lg pl-10 text-primary text"><p className="">Todays Recipe</p></div>

      <Link href={`/recipe/${todaysRecipe}`} ><div className="flex bg-primary text-secondary rounded-lg shadow-lg h-[60px] w-[60]"><button className="">Lets Make It</button></div></Link>

    </div>
  )
}

export default TodaysRecipe;