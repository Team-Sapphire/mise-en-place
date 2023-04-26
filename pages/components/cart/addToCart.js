import React from 'react'

const AddToCart = ({cart}) => {

  var handleAddToCart = () => {
    console.log('Adding to cart');
    console.log(cart);
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