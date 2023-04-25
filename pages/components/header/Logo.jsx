import { useState } from 'react'
import chefHat from '/public/chef-hat.svg'
import logo from '/public/mise-en-place-Logo.svg'
import axios from 'axios'
import Image from 'next/image'



function Logo () {

  return (
    <div>
      <div className='flex justify-center p-1 basis-1/2'>
        <a target="_blank" >
          <Image src={chefHat} className="w-12 h-12 logo" alt='chef hat'/>
        </a>
      </div>
      {/* <div>
        <h1 className='self-center text-slate-100'>Mise En Places</h1>
      </div> */}
      <div>
        <a target="_blank" >
          <Image src={logo} className="w-12 h-12 logo" alt='chef hat'/>
        </a>
      </div>

    </div>
  )
}

export default Logo
