import React from 'react'

const Ingredient = ({ingredient}) => {
  return (
    <div>
      <div className='flex border border-black m-20 justify-between'>
        <div>{ingredient.name}</div>
        <div>Available</div>
        <div>Needed</div>
      </div>
    </div>
  );
};

export default Ingredient;