import React, { useState, useEffect } from 'react';
import ExcludedInput from './ExcludedInput';

const ExcludedForm = ({ random, handle13, format, setAllPreferences, allPreferences, trackChanges }) => {
  const [excluded, setExcluded] = useState([]);
  const [excludedFormChildren, setExcludedFormChildren] = useState([<ExcludedInput key={`e${random(0, 1000000000)}`} handle13={handle13} trackChanges={trackChanges} excluded={excluded} setExcluded={setExcluded} />]);

  useEffect(() => {
    format('excluded', excluded);
    setAllPreferences(allPreferences => ({...allPreferences, excluded: excluded}))
  }, [excluded]);

  const handleAddAnotherExclusionClick = (e) => {
    e.preventDefault();
    setExcludedFormChildren((excludedFormChildren) => [
      ...excludedFormChildren,
      <ExcludedInput key={`e${random(0, 1000000000)}`} handle13={handle13} trackChanges={trackChanges} excluded={excluded} setExcluded={setExcluded} />
    ]);
  };

  const handleAddAllClick = (e) => {
    e.preventDefault();
    for(let i = 0; i < e.target.length - 2; i++) {
      if (e.target[i].value.trim() !== '' && !excluded.includes(e.target[i].value.trim())) {
        setExcluded(excluded => [...excluded, e.target[i].value.trim()]);
      }
    }
    console.log('excluded arr', excluded);
    setExcluded(excluded => [...new Set(excluded)]);
  };

  return (
    <form className='flex flex-col items-center mt-2' onSubmit={handleAddAllClick}>
      <p className='w-[80%] flex-wrap text-center mt-2' htmlFor='excluded-label'>If you couldn&apos;t find your allergy in the other dropdown menus or you want a particular food or ingredient to be excluded from your meals, please list it here!</p>
      {excludedFormChildren.map(input => input)}
      <button className='btn btn-sm btn-secondary mt-2 mr-2' onClick={e => handleAddAnotherExclusionClick(e)}>Add more</button>
      <button className='btn btn-sm btn-primary mt-2' type='submit'>Add Exclusions</button>
    </form>
  );
};

export default ExcludedForm;