import React, { useState } from 'react';
import ExcludedInput from './ExcludedInput';

const ExcludedForm = ({ random, handle13 }) => {
  const [excluded, setExcluded] = useState([]);
  const [excludedFormChildren, setExcludedFormChildren] = useState([<ExcludedInput key={`e${random(0, 1000000000)}`} handle13={handle13} />]);

  const handleAddAnotherExclusionClick = (e) => {
    e.preventDefault();
    setExcludedFormChildren((excludedFormChildren) => [
      ...excludedFormChildren,
      <ExcludedInput key={`e${random(0, 1000000000)}`} handle13={handle13} />
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
    <form onSubmit={handleAddAllClick}>
      <label htmlFor='excluded-label'>If you couldn't find your allergy in the above menus or you want a particular food or ingredient to be excluded from your meals, please list it here!</label>
      {excludedFormChildren.map(input => input)}
      <button onClick={e => handleAddAnotherExclusionClick(e)}>Add more</button>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default ExcludedForm;