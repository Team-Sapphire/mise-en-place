import React, { useState } from 'react';
import DietDropdownMenu from './DietDropdownMenu';

const DietPreferencesForm = ({ params, random }) => {
  const [value, setValue] = useState();
  const [dietPreferences, setDietPreferences] = useState([]);
  const [dietFormChildren, setDietFormChildren] = useState([
    <DietDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} onChange={e => handleVal(e)} />
  ]);

  const handleAddAnotherDietPreferenceClick = (e) => {
    e.preventDefault();
    setDietFormChildren((dietFormChildren) => [
      ...dietFormChildren,
      <DietDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} onChange={e => handleVal(e)} />
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
      <DietDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} onChange={e => handleVal(e)} />
    ]);
  };

  function handleVal(e) {
    setValue(e.target[0].value);
  };

  return (
    <form onSubmit={handleAddAllClick}>
      <label htmlFor='diet-label'>Choose a diet preference:</label>
      {dietFormChildren.map(dropdown => dropdown)}
      <button onClick={(e) => handleAddAnotherDietPreferenceClick(e)}>Add more</button>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default DietPreferencesForm;