import React, { useState } from 'react';
import HealthDropdownMenu from './HealthDropdownMenu';

const HealthPreferencesForm = ({ params, random }) => {
  const [value, setValue] = useState();
  const [healthPreferences, setHealthPreferences] = useState([]);
  const [healthFormChildren, setHealthFormChildren] = useState([
    <HealthDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} onChange={e => handleVal(e)} />
  ]);

  const handleAddAnotherHealthPreferenceClick = (e) => {
    e.preventDefault();
    setHealthFormChildren((healthFormChildren) => [
      ...healthFormChildren,
      <HealthDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} onChange={e => handleVal(e)} />
    ]);
  };

  const handleAddAllClick = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.target.length; i++) {
      if (e.target[i].value.trim() !== '' && !healthPreferences.includes(e.target[i].value)) {
        setHealthPreferences((healthPreferences) => [...healthPreferences, e.target[i].value]);
      }
    }
    console.log('dprefs array', healthPreferences)
    setHealthPreferences((healthPreferences) => [...new Set(healthPreferences)]);
    setHealthFormChildren([
      <HealthDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} onChange={e => handleVal(e)} />
    ]);
  };

  function handleVal(e) {
    setValue(e.target[0].value);
  };

  return (
    <form onSubmit={handleAddAllClick}>
      <label htmlFor='health-label'>Choose a health preference:</label>
      {healthFormChildren.map(dropdown => dropdown)}
      <button onClick={(e) => handleAddAnotherHealthPreferenceClick(e)}>Add more</button>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default HealthPreferencesForm;