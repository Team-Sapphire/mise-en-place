import React, { useState, useEffect } from 'react';
import DietDropdownMenu from './DietDropdownMenu';

const DietPreferencesForm = ({ params, random, handle13, format }) => {
  const [dietPreferences, setDietPreferences] = useState([]);
  const [dietFormChildren, setDietFormChildren] = useState([
    <DietDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} handle13={handle13} />
  ]);

  useEffect(() => {
    format('diet', dietPreferences);
  }, [dietPreferences]);

  const handleAddAnotherDietPreferenceClick = (e) => {
    e.preventDefault();
    setDietFormChildren((dietFormChildren) => [
      ...dietFormChildren,
      <DietDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} handle13={handle13} />
    ]);
  };

  const handleAddAllClick = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.target.length; i++) {
      if (e.target[i].value.trim() !== '' && !dietPreferences.includes(e.target[i].value)) {
        setDietPreferences((dietPreferences) => [...dietPreferences, e.target[i].value]);
      }
    }
    console.log('dprefs array', dietPreferences)
    setDietPreferences((dietPreferences) => [...new Set(dietPreferences)]);
    setDietFormChildren([
      <DietDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} handle13={handle13} />
    ]);
  };

  return (
    <form onSubmit={handleAddAllClick}>
      <label htmlFor='diet-label'>Choose a diet preference:</label>
      {dietFormChildren.map(dropdown => dropdown)}
      <button className='btn' onClick={e => handleAddAnotherDietPreferenceClick(e)}>Add more</button>
      <button className='btn' type='submit'>Submit</button>
    </form>
  );
};

export default DietPreferencesForm;