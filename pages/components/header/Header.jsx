import { useState } from 'react'
import axios from 'axios'
import Logo from './Logo.jsx'



function Header () {

  return (
    <div className="flex h-max navbar bg-gray-800 sticky top-0 z-50 drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)]">
     <Logo />

    </div>
  )
}

export default Header
