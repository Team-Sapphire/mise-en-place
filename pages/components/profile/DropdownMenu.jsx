import React from 'react';

const DropdownMenu = ({ options
  // , handleAddAnotherPreferenceClick
 }) => (
  <div>
    <label htmlFor='label'>Choose a preference:</label>
    <input type='text' list='label' name='preference'/>
    <datalist id='label'>
      {options.map(option =>
        <option value={option}>{option}</option>
      )}
    </datalist>
    <button>Remove new entry</button>
  </div>
);

export default DropdownMenu;