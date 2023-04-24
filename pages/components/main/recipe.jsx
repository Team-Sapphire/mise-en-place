let Recipe = ({recipe}) => {
  return (
    <div className="flex flex-row justify-between border-2 border-black rounded-lg mt-2 h-[100px]">

      <p className="pt-10 pl-4">{recipe}</p>

      <div className="flex pt-6 pr-4 gap-4">

      <button className='bg-yellow-400 rounded-full border-2 border-black w-[50px] h-[50px]'>?</button>

      <button className='bg-rose-500 rounded-full border-2 border-black w-[50px] h-[50px]'>X</button>
      </div>

    </div>
  )
}

export default Recipe;