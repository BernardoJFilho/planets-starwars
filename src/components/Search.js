import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Search() {
  const { isName, handleChange } = useContext(AppContext);

  return (
    <input
      type="text"
      data-testid="name-filter"
      value={ isName }
      name="isName"
      onChange={ handleChange }
    />
  );
}
