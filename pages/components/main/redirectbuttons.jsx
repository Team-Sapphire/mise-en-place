import Link from "next/link";
let RedirectButtons = () => {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/userprofile"><button className="bg-sky-500/100 w-[100%] h-[100px] rounded-lg">Manage Preferences</button></Link>
      <Link href="/cart"><button className="bg-sky-500/100 w-[100%] h-[100px] rounded-lg">Manage Cart</button></Link>
    </div>
  )
}

export default RedirectButtons;