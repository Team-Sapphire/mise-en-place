import React from 'react';

const ExcludedInput = ({ handle13, trackChanges, excluded, setExcluded }) => (
  <input className='w-52 mt-2 border-1 rounded-md block' type='text' onKeyPress={e => handle13(e)} />
);

export default ExcludedInput;