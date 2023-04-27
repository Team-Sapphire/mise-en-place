import React from 'react';

const ExcludedInput = ({ handle13 }) => (
  <input type='text' onKeyPress={e => handle13(e)} />
);

export default ExcludedInput;