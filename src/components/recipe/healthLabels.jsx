import React from "react";

const HealthLabels = ({ thisRecipe }) => {
  let index = 0;
  return (
    <div className="text-xs" key={thisRecipe.uri}>
      {thisRecipe.healthLabels &&
        thisRecipe.healthLabels.map((label) => {
          index++;
          return <p key={index}>{label}, </p>;
        })}
    </div>
  );
};

export default HealthLabels;
