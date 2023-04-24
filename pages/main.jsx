import Link from 'next/link'
import TodaysRecipe from './components/main/todaysrecipe.jsx';
let Main = () => {
  return (
    <div class="grid lg:grid-cols-6 grid-rows-6 gap-5 h-[100%] w-[100%]">

    <div class="col-span-6 row-span-2 p-4 shadow-lg rounded-md">
      <TodaysRecipe />
    </div>

    <div class="col-span-4 row-span-4 p-4 shadow-lg rounded-md flex items-center justify-center">2</div>

    <div class="col-span-2 row-span-4 p-4 shadow-lg rounded-md flex items-center justify-center">3</div>
  </div>
  )
}

export default Main;