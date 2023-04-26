import React from 'react'
import axios from 'axios'

const AddToCart = ({cart, user}) => {

  // var usersCart = {};
  // usersCart.user = user['mise/token'];
  // usersCart.cart = cart;


  var handleAddToCart = () => {
    console.log('Adding to cart');
    console.log(cart);
    axios.post('/api/kroger/addToKrogerCart', usersCart).then(response => {
      console.log(response);
    });
  };

  return (
    <>
      <div className='flex flex-col h-full justify-center'>
        <button className='border h-12 w-40 border-black rounded-lg hover:scale-125 ease-in-out duration-300 bg-yellow-500' onClick={handleAddToCart}>Send to Kroger</button>
        <img className='ml-10 mt-10' src='https://image.pngaaa.com/219/2599219-middle.png' width={100} />
      </div>
    </>
  );
};

export default AddToCart;