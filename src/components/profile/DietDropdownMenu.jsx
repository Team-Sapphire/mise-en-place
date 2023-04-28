import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const DietDropdownMenu = ({ options, random, handle13, trackChanges, dietPreferences, setDietPreferences }) => {
  const [showing, setShowing] = useState(true);

  const handleRemoveClick = () => {
    event.preventDefault();
    setShowing(!showing);
  };

  return (
    showing && (
      <div>
        {/* <input type='text' list='diet-label' /> */}
        <select className='w-52 mt-2' id='diet-label' onChange={e => trackChanges(e, dietPreferences, setDietPreferences)} onKeyPress={e => handle13(e)} >
          <option value =''></option>
          {options.map(option =>
            <option value={option} key={`dp${random(0, 1000000000)}`}>{option}</option>
          )}
        </select>
        <CloseIcon fontSize='inherit' onClick={handleRemoveClick} />
      </div>
    )
  );
};

export default DietDropdownMenu;