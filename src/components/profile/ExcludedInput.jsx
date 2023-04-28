import React from 'react';

const ExcludedInput = ({ handle13, trackChanges, excluded, setExcluded }) => (
  <input type='text'
  //  onSubmit={e => trackChanges(e, excluded, setExcluded)}
   onKeyPress={e => handle13(e)} />
);

export default ExcludedInput;