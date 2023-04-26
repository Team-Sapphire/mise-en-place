import Image from 'next/image'
import Link from 'next/link'
// import profilePhoto from '/public/favicon_io/favicon-16x16.png'
import profilePhoto from '/public/favicon_io/favicon.ico'

function ProfileMenu ({quickLinks}) {

  return (
    <div className="dropdown dropdown-end">

      <label tabIndex={0} className="bg-orange-500 btn btn-lg btn-circle avatar hover:border-yellow-500">
      {(true) && <span className="indicator-item indicator-bottom badge badge-secondary right-[20%] bg-green-800 border-green-800">{1}</span>}
        <div className="w-10 rounded-full">
          <img src="/public/favicon_ico/favicon.ico" alt="profile" layout="fill" />

        </div>
      </label>
      <ul tabIndex={0} className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52">
        <li key={0}>
          <Link href={quickLinks['Profile']}>Profile</Link>
        </li>
        <li key={1}>
          <Link href={quickLinks['Cart']}>Cart</Link>
        </li>

      </ul>

      {/* <div className="grid w-32 h-32 bg-base-300 place-items-center">content</div> */}
    </div>

  )
}

export default ProfileMenu
