import React, { useState, useEffect } from 'react';
import DietDropdownMenu from './DietDropdownMenu';

const DietPreferencesForm = ({ params, random, handle13, format, setAllPreferences, allPreferences, trackChanges }) => {
  const [dietPreferences, setDietPreferences] = useState([]);
  const [dietFormChildren, setDietFormChildren] = useState([
    <DietDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} handle13={handle13} trackChanges={trackChanges} dietPreferences={dietPreferences} setDietPreferences={setDietPreferences} />
  ]);

  useEffect(() => {
    // format('diet', dietPreferences);
    setAllPreferences({...allPreferences, diet: dietPreferences})
  }, [dietPreferences]);

  const handleAddAnotherDietPreferenceClick = (e) => {
    e.preventDefault();
    setDietFormChildren((dietFormChildren) => [
      ...dietFormChildren,
      <DietDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} handle13={handle13} trackChanges={trackChanges} dietPreferences={dietPreferences} setDietPreferences={setDietPreferences} />
    ]);
  };

  return (
    <>
      <label htmlFor='diet-label'>Choose a diet preference:</label>
      {dietFormChildren.map(dropdown => dropdown)}
      <button className='btn btn-sm btn-secondary my-2' onClick={e => handleAddAnotherDietPreferenceClick(e)}>Add more</button>
    </>
  );
};

export default DietPreferencesForm;