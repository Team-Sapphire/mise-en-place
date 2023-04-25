import React from 'react'

const AddToCart = ({cart}) => {

  var handleAddToCart = () => {
    console.log('Adding to cart');
    console.log(cart);
  };

  return (
    <>
      <div className='flex justify-center'>
        <button className='border h-12 w-40 border-black rounded-lg hover:scale-125 ease-in-out duration-300 bg-yellow-500' onClick={handleAddToCart}>Send to Kroger</button>
      </div>
    </>
  );
};

export default AddToCart;