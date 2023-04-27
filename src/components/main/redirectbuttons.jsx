import Link from "next/link";
let RedirectButtons = () => {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/userprofile"><button className="bg-orange-500 w-[100%] h-[100px] rounded-lg hover:scale-105 ease-in-out duration-300">Manage Preferences</button></Link>
      <Link href="/cart"><button className="bg-orange-500 w-[100%] h-[100px] rounded-lg hover:scale-105 ease-in-out duration-300">Manage Cart</button></Link>
    </div>
  )
}

export default RedirectButtons;