import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const HealthDropdownMenu = ({ options, random, handle13, trackChanges, healthPreferences, setHealthPreferences }) => {
  const [showing, setShowing] = useState(true);

  const handleRemoveClick = () => {
    event.preventDefault();
    setShowing(!showing);
  };

  return (
    showing && (
      <div>
        {/* <input type='text' list='health-label' onKeyPress={e => handle13(e)} /> */}
        <select id='health-label' onChange={e => trackChanges(e, healthPreferences, setHealthPreferences)} onKeyPress={e => handle13(e)} >
          <option value =''></option>
          {options.map(option =>
            <option value={option} key={`dp${random(0, 1000000000)}`}>{option}</option>
          )}
        </select>
        <CloseIcon onClick={handleRemoveClick} />
      </div>
    )
  );
};

export default HealthDropdownMenu;