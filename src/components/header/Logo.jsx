import { useState } from 'react'
import chefHat from '/public/logo-chef-hat.svg'
import logo from '/public/logo-mise-en-place.svg'
import axios from 'axios'
import Image from 'next/image'



function Logo () {

  return (
    <div className='flex-col absolute left-[49%] pb-4 -translate-x-[50%]'>
      <div className='flex justify-center basis-4/5'>
        <a target="_blank" >
          <Image src={chefHat} className="w-12 h-12 logo" alt='chef hat'/>
        </a>
      </div>
      <div>
        <a target="_blank" >
          <Image src={logo} className="w-40 logo" alt='logo'/>
        </a>
      </div>

    </div>
  )
}

export default Logo
