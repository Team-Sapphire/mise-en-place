import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const CuisineDropdownMenu = ({ options, random, handle13, trackChanges, cuisinePreferences, setCuisinePreferences }) => {
  const [showing, setShowing] = useState(true);

  const handleRemoveClick = () => {
    event.preventDefault();
    setShowing(!showing);
  };

  return (
    showing && (
      <div>
        {/* <input type='text' list='cuisine-label' onKeyPress={e => handle13(e)} /> */}
        <select id='cuisine-label' onChange={e => trackChanges(e, cuisinePreferences, setCuisinePreferences)} onKeyPress={e => handle13(e)}>
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

export default CuisineDropdownMenu;