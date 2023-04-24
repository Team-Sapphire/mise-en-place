import React from 'react'

const Ingredient = ({ingredient}) => {
  return (
    <div>
      <div className='border border-black m-5'>
        <div className='ml-5'>{ingredient.food}</div>
        <div className='ml-5'>Need: {ingredient.quantity}</div>
      </div>
    </div>
  );
};

export default Ingredient;