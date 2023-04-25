import React from 'react'

const Ingredient = ({ingredient}) => {
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