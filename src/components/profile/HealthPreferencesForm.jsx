import React, { useState, useEffect } from 'react';
import HealthDropdownMenu from './HealthDropdownMenu';

const HealthPreferencesForm = ({ params, random, handle13, format, setAllPreferences, allPreferences, trackChanges }) => {
  const [healthPreferences, setHealthPreferences] = useState([]);
  const [healthFormChildren, setHealthFormChildren] = useState([
    <HealthDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} handle13={handle13} trackChanges={trackChanges} healthPreferences={healthPreferences} setHealthPreferences={setHealthPreferences} />
  ]);

  useEffect(() => {
    setAllPreferences({...allPreferences, health: healthPreferences})
  }, [healthPreferences]);

  const handleAddAnotherHealthPreferenceClick = (e) => {
    e.preventDefault();
    setHealthFormChildren((healthFormChildren) => [
      ...healthFormChildren,
      <HealthDropdownMenu options={params} key={`d${random(0, 1000000000)}`} random={random} handle13={handle13} trackChanges={trackChanges} healthPreferences={healthPreferences} setHealthPreferences={setHealthPreferences} />
    ]);
  };

  return (
    <>
      <label htmlFor='health-label'>Choose a health preference:</label>
      {healthFormChildren.map(dropdown => dropdown)}
      <button className='btn btn-sm btn-secondary my-2' onClick={e => handleAddAnotherHealthPreferenceClick(e)}>Add more</button>
    </>
  );
};

export default HealthPreferencesForm;