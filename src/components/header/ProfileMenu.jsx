import Image from 'next/image'
import Link from 'next/link'
// import profilePhoto from '/public/favicon_io/favicon-16x16.png'
import profilePhoto from '/public/chef-profile.ico'
import {useState} from 'react';
import ThemeButton from './ThemeButton';

const themes = {
  '🧁': 'cupcake',
  '💦': 'aqua',
  '❤️': 'valentine',
  '💡': 'light',
  '🖤': 'dark',
  '🐝': 'bumblebee',
  '🟢': 'emerald',
  '🏢': 'corporate',
  '🤖': 'synthwave',
  '👾': 'retro',
  '👽': 'cyberpunk',
  '🎃': 'halloween',
  '🌱': 'garden',
  '🌳': 'forest',
  '🔉': 'lofi',
  '🩷': 'pastel',
  '🦄': 'fantasy',
  '📦': 'wireframe',
  '⬛': 'black',
  '💍': 'luxury',
  '🧛‍♂️': 'dracula',
  '🕶': 'cmyk',
  '🍂': 'autumn',
  '🕴': 'business',
  '🤪': 'acid',
  '🍋': 'lemonade',
  '🌃': 'night',
  '☕️': 'coffee',
  '❄️': 'winter',
  '🦝': 'remiTheme'
}

function ProfileMenu ({quickLinks, user}) {
  const [mouseOnLink, setMouseOnLink] = useState(false);
  const [mouseOnModal, setMouseOnModal] = useState(false);

  return (
    <div className="mr-6 dropdown dropdown-end dropdown-hover">

      <label tabIndex={0} className="bg-orange-500 btn btn-lg btn-circle avatar indicator hover:border-orange-500 hover:border-4 hover:bg-slate-800" >
      {(true) && <span className="indicator-item indicator-bottom badge badge-secondary right-[20%] bg-yellow-500 border-transparent">{1}</span>}
        <div className="w-10 rounded-full">
          <Image src={profilePhoto} alt="Icon" width={64} height={64} />

        </div>
      </label>
      <ul tabIndex={0} className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52">
        <li key={0}>
          <Link href={quickLinks['Profile']}>Profile</Link>
        </li>
        <li key={2}>
          <Link href={quickLinks['Cart']}>Cart</Link>
        </li>
        {user && <li key={1}>
          <Link href={quickLinks['Log Out']}>Log Out</Link>
        </li>}
        {!user && <li key={1}>
          <Link href={quickLinks['Log In']}>Log In</Link>
        </li>}
        <li
          key={5000}
          onMouseOver={() => {
            setMouseOnLink(true);
          }}
          onMouseOut={() => {
            setMouseOnLink(false);
          }}
        >
          <a>Themes</a>
          {(mouseOnLink || mouseOnModal) && (
            <div
              onMouseOver={() => {
                setMouseOnModal(true);
              }}
              onMouseOut={() => {
                setMouseOnModal(false);
              }}
              className="absolute flex flex-row flex-wrap justify-between w-[192px] left-0 top-12 hover:cursor-default bg-base-100 hover:bg-base-100"
            >
              {Object.keys(themes).map(key => <ThemeButton key={key} theme={themes[key]}>{key}</ThemeButton>)}
            </div>
          )}
        </li>
      </ul>

      {/* <div className="grid w-32 h-32 bg-base-300 place-items-center">content</div> */}
    </div>

  )
}

export default ProfileMenu
