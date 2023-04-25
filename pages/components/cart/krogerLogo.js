import React from 'react'
import {useEffect, useState} from 'react'
import Image from 'next/image'

const KrogerLogo = ({cart}) => {
  const [refresh, setRefresh] = useState(false);
  var newCart = cart.slice(0,11);
  setTimeout(() => {
    setRefresh(true);
  }, 10000)
  return (
    <>
      {refresh ? <div className=''>
        {cart.map((ingredient, index) => {
          return (
            <div className='mb-5' key={index + ingredient}>{ingredient.description}</div>
          );
        })}
      </div> :
      <img src='https://media.tenor.com/n6U0GVtYi0sAAAAC/boil-water.gif' alt='pot cooking' />}
    </>
  );
};

{/* <div className='flex justify-end items-end'>
        <img src='https://cdn.cookielaw.org/logos/f95f67ef-e8ad-4274-9c69-04fd38042f86/1971b324-a03e-48b4-be98-805acc3e826f/6a1aacee-4a86-427f-ab8d-9a26426daa57/FreshCart_Kroger_Lockup_Color_sm.png' alt='Krogers Logo' width='500' height='500'/>
      </div> */}

export default KrogerLogo;