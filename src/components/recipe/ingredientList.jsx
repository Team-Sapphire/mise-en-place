import React from "react";

const IngredientList = ({ ingredientsByYield }) => {
  let index = 0;
  return (
    <div>
      {ingredientsByYield.map((ingredient) => {
        index++;
        return <p key={index}>{ingredient}</p>;
      })}
    </div>
  );
};

export default IngredientList;
