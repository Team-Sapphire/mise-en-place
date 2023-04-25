import React from "react";

const HealthLabels = ({ thisRecipe }) => {
  return (
    <p className="text-xs" key={thisRecipe.uri}>
      {thisRecipe.healthLabels.map((label) => {
        return <>{label}, </>;
      })}
    </p>
  );
};

export default HealthLabels;
