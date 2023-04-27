import React, { useState } from 'react';
import CuisineDropdownMenu from './CuisineDropdownMenu';

const CuisinePreferencesForm = ({ params, random }) => {
  const [value, setValue] = useState();
  const [cuisinePreferences, setCuisinePreferences] = useState([]);
  const [cuisineFormChildren, setCuisineFormChildren] = useState([
    <CuisineDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} onChange={e => handleVal(e)} />
  ]);

  const handleAddAnotherCuisinePreferenceClick = (e) => {
    e.preventDefault();
    setCuisineFormChildren((cuisineFormChildren) => [
      ...cuisineFormChildren,
      <CuisineDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} onChange={e => handleVal(e)} />
    ]);
  };

  const handleAddAllClick = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.target.length; i++) {
      if (e.target[i].value.trim() !== '' && !cuisinePreferences.includes(e.target[i].value)) {
        setCuisinePreferences((cuisinePreferences) => [...cuisinePreferences, e.target[i].value]);
      }
    }
    console.log('dprefs array', cuisinePreferences)
    setCuisinePreferences((cuisinePreferences) => [...new Set(cuisinePreferences)]);
    setCuisineFormChildren([
      <CuisineDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} onChange={e => handleVal(e)} />
    ]);
  };

  function handleVal(e) {
    setValue(e.target[0].value);
  };

  return (
    <form onSubmit={handleAddAllClick}>
      <label htmlFor='cuisine-label'>Choose a cuisine type preference:</label>
      {cuisineFormChildren.map(dropdown => dropdown)}
      <button onClick={(e) => handleAddAnotherCuisinePreferenceClick(e)}>Add more</button>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default CuisinePreferencesForm;