import { useState } from 'react'
import axios from 'axios'
import Logo from './Logo.jsx'
import HeaderNavButton from './HeaderNavButton.jsx'
import ProfileMenu from './ProfileMenu.jsx'
import { useUser } from "@auth0/nextjs-auth0/client";



function Header ({className=''}) {

  const { user, error, isLoading } = useUser();

  const quickLinks = {
    'About': '/about/',
    'Home': '/main/',
    'Profile': '/userprofile/',
    'Log In': '/api/auth/login',
    'Log Out': '/api/auth/logout',
    'Cart': '/cart/'
  }

  return (
    <div className={className + " flex h-max navbar justify-between bg-gray-800 sticky top-0 z-50 drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)]"}>
     <div className='ml-6'>
      <HeaderNavButton title={'Home'} quickLinks={quickLinks}></HeaderNavButton>
      <HeaderNavButton title={'About'} quickLinks={quickLinks}></HeaderNavButton>
      {!user && <HeaderNavButton title={'Log In'} quickLinks={quickLinks}></HeaderNavButton>}
     </div>

     <Logo />

     <ProfileMenu quickLinks={quickLinks} user={user}/>

    </div>
  )
}

export default Header
