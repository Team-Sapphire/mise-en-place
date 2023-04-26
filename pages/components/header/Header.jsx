import { useState } from 'react'
import axios from 'axios'
import Logo from './Logo.jsx'
import HeaderNavButton from './HeaderNavButton.jsx'
import ProfileMenu from './ProfileMenu.jsx'



function Header () {

  const quickLinks = {
    'About': '/about/',
    'Home': '/main/',
    'Profile': '/userprofile/',
    'Cart': '/cart/'
  }

  return (
    <div className="flex h-max navbar justify-between bg-gray-800 sticky top-0 z-50 drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)]">
     <div className='ml-6'>
      <HeaderNavButton title={'Home'} quickLinks={quickLinks}></HeaderNavButton>
      <HeaderNavButton title={'About'} quickLinks={quickLinks}></HeaderNavButton>
     </div>

     <Logo />

     <ProfileMenu quickLinks={quickLinks}/>

    </div>
  )
}

export default Header
