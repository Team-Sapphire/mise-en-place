import React from 'react'
import {useEffect, useState} from 'react'
import Loading from './Loading.js'
import Image from 'next/image'

const KrogerCart = ({cart}) => {
  var shellRows = [1,2,3,4,5,6,7];
  const [refresh, setRefresh] = useState(false);
  var newCart = cart.slice(0,11);
  setTimeout(() => {
    setRefresh(true);
  }, 10000)
  return (
    <>
      {refresh ?
      <div>
        {newCart.map((ingredient, index) => {
          return (
            <div className='flex container border h-[50px] rounded-lg border-black m-5 bg-blue-700 text-white' key={index + ingredient}>
              <div className='ml-5'>{ingredient.description}</div>
            </div>
          );
        })}
      </div> :
      <div className='mt-20 ml-5'>
        <Loading shellRows={shellRows}/>
      </div>
      }
    </>
  );
};

{/* <div className='flex justify-end items-end'>
        <img src='https://cdn.cookielaw.org/logos/f95f67ef-e8ad-4274-9c69-04fd38042f86/1971b324-a03e-48b4-be98-805acc3e826f/6a1aacee-4a86-427f-ab8d-9a26426daa57/FreshCart_Kroger_Lockup_Color_sm.png' alt='Krogers Logo' width='500' height='500'/>
      </div> */}

export default KrogerCart;