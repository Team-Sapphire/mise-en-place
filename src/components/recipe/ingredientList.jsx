import React from "react";

const IngredientList = ({ customize, ingredientsByYield }) => {
  let index = 0;
  if (customize) {
    return (
      <div contenteditable="true">
        {ingredientsByYield.map((ingredient) => {
          index++;
          return <p key={index}>{ingredient}</p>;
        })}
      </div>
    );
  } else {
    return (
      <div>
        {ingredientsByYield.map((ingredient) => {
          index++;
          return <p key={index}>{ingredient}</p>;
        })}
      </div>
    );
  }
};

export default IngredientList;
