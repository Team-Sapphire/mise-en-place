import React, { useState, useEffect } from 'react';
import CuisineDropdownMenu from './CuisineDropdownMenu';

const CuisinePreferencesForm = ({ params, random, handle13, format, setAllPreferences, allPreferences, trackChanges }) => {
  const [cuisinePreferences, setCuisinePreferences] = useState([]);
  const [cuisineFormChildren, setCuisineFormChildren] = useState([
    <CuisineDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} handle13={handle13} trackChanges={trackChanges} cuisinePreferences={cuisinePreferences} setCuisinePreferences={setCuisinePreferences} />
  ]);

  useEffect(() => {
    // format('cuisineType', cuisinePreferences);
    setAllPreferences({...allPreferences, cuisineType: cuisinePreferences});
  }, [cuisinePreferences]);

  const handleAddAnotherCuisinePreferenceClick = (e) => {
    e.preventDefault();
    setCuisineFormChildren((cuisineFormChildren) => [
      ...cuisineFormChildren,
      <CuisineDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} handle13={handle13} trackChanges={trackChanges} cuisinePreferences={cuisinePreferences} setCuisinePreferences={setCuisinePreferences} />
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
      <CuisineDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} handle13={handle13} trackChanges={trackChanges} cuisinePreferences={cuisinePreferences} setCuisinePreferences={setCuisinePreferences} />
    ]);
  };

  return (
    <>
      <label htmlFor='cuisine-label'>Choose a cuisine type:</label>
      {cuisineFormChildren.map(dropdown => dropdown)}
      <button onClick={e => handleAddAnotherCuisinePreferenceClick(e)}>Add more</button>
    </>
  );
};

export default CuisinePreferencesForm;