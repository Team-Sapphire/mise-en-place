import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { IoIosArrowForward } from 'react-icons/io'

const AddToCart = ({cart, user}) => {

  var usersCart = {};
  var token;
  if (user === undefined) {
    var userToken = undefined;
    usersCart.token = userToken;
  } else {
    var userToken = user['mise/token'];
    usersCart.token = userToken;
  }

  const [disableButton, setDisableButton] = useState(true);
  setTimeout(() => {
    setDisableButton(false)
  }, 10000)

  var handleAddToCart = () => {
    console.log('Adding to cart');
    usersCart.cart = cart;
    console.log(usersCart)
    axios.post('/api/kroger/addToKrogerCart', usersCart).then(response => {
      console.log(response);
    });
  };

  return (
    <>
      <div className='flex flex-col h-full justify-center'>
        <div className=''>
          {disableButton ? <button className='flex items-center justify-center border h-12 w-40 border-black rounded-lg bg-base-100 opacity-50 cursor-not-allowed'>Send to Kroger</button> :
          <button className='flex items-center justify-center border h-12 w-40 border-black rounded-lg hover:scale-125 ease-in-out duration-300 bg-primary-100 text-primary' onClick={handleAddToCart}>Send to Kroger <IoIosArrowForward className='mt-1' /></button>}
        </div>
        <div>
      </div>
      </div>
    </>
  );
};

export default AddToCart;