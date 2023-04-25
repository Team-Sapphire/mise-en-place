import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Ingredient = ({ingredient, setCart, cart, krogerCart}) => {

  useEffect(() => {
    var handleKroger = async () => {
      await axios.post('https://localhost:9000/api/kroger/getKrogerProducts', {ingredient: ingredient.food}).then(response => {
        let products = response.data.data;
        krogerCart.push(products[0]);
        console.log(krogerCart);
      })
    };
    handleKroger();
    setCart(krogerCart);
  }, []);

  return (
    <div>
      <div className='flex container border w-[1000px] h-[40px] rounded-lg border-black m-5 justify-around'>
        <div className='ml-5'>{ingredient.food}</div>
        <div className='ml-5'>Quantity: {ingredient.quantity}</div>
        <div>
          <button>+</button><button>-</button>
        </div>
      </div>
    </div>
  );
};

export default Ingredient;