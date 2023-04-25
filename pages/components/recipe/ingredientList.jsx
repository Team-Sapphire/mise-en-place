import React from "react";

const IngredientList = ({ customize, ingredientsByYield }) => {
  if (customize) {
    return (
      <div contenteditable="true">
        {ingredientsByYield.map((ingredient) => {
          return <p>{ingredient}</p>;
        })}
      </div>
    );
  } else {
    return (
      <div>
        {ingredientsByYield.map((ingredient) => {
          return <p>{ingredient}</p>;
        })}
      </div>
    );
  }
};

export default IngredientList;
