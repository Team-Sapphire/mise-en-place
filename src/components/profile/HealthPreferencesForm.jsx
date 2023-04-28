import React, { useState, useEffect } from 'react';
import HealthDropdownMenu from './HealthDropdownMenu';

const HealthPreferencesForm = ({ params, random, handle13, format, setAllPreferences, allPreferences, trackChanges }) => {
  const [healthPreferences, setHealthPreferences] = useState([]);
  const [healthFormChildren, setHealthFormChildren] = useState([
    <HealthDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} handle13={handle13} trackChanges={trackChanges} healthPreferences={healthPreferences} setHealthPreferences={setHealthPreferences} />
  ]);

  useEffect(() => {
    // format('health', healthPreferences);
    setAllPreferences({...allPreferences, health: healthPreferences})
  }, [healthPreferences]);

  const handleAddAnotherHealthPreferenceClick = (e) => {
    e.preventDefault();
    setHealthFormChildren((healthFormChildren) => [
      ...healthFormChildren,
      <HealthDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} handle13={handle13} trackChanges={trackChanges} healthPreferences={healthPreferences} setHealthPreferences={setHealthPreferences} />
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
    // setAllPreferences({...allPreferences, health: healthPreferences})
    setHealthFormChildren([
      <HealthDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} handle13={handle13} trackChanges={trackChanges} healthPreferences={healthPreferences} setHealthPreferences={setHealthPreferences} />
    ]);
  };

  return (
    <>
      <label htmlFor='health-label'>Choose a health preference:</label>
      {healthFormChildren.map(dropdown => dropdown)}
      <button onClick={e => handleAddAnotherHealthPreferenceClick(e)}>Add more</button>
    </>
  );
};

export default HealthPreferencesForm;