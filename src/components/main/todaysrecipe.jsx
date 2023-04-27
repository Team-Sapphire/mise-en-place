import Link from "next/link";
let TodaysRecipe = ({todaysRecipe}) => {
  return (

    <div className="flex justify-between items-center border-2 border-black rounded-lg h-[50%]">

      <div className="flex rounded-lg pl-10"><p className="">Todays Recipe</p></div>

      <Link href={`/recipe/${todaysRecipe}`} ><div className="flex bg-sky-500/100 rounded-lg shadow-lg h-[100%] w-[20%] pl-[6%]"><button className>Lets Make It</button></div></Link>

    </div>
  )
}

export default TodaysRecipe;