import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Ingredient = ({ingredient, setCart, cart, krogerCart}) => {
  console.log(ingredient)
  useEffect(() => {
    var handleKroger = async () => {
      await axios.post('/api/kroger/getKrogerProducts', {ingredient: ingredient.food}).then(response => {
        let products = response.data.data;
        krogerCart.push(products[0]);
        console.log(krogerCart);
        setCart(krogerCart);
      })
    };
    handleKroger();
  }, []);

  return (
    <div>
      <div className='flex container border w-[1000px] h-[50px] rounded-lg border-black m-5 bg-base-100 text-primary'>
        <div className='ml-5 mt-3'>{ingredient.text}</div>
        {/* <div className='ml-5 mt-3'>Quantity: {ingredient.quantity}</div> */}
      </div>
    </div>
  );
};

export default Ingredient;