import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

export default function Search() {
  const [isSearch, setIsSearch] = useState({ column: 'population',
    comparison: 'maior que',
    number: 0,
  });
  const { isNome, handleChange, setIsBusca } = useContext(AppContext);

  const buttonclick = () => {
    setIsBusca(isSearch);
  };

  const onChangeFunc = ({ target }) => {
    const { name, value } = target;
    setIsSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <label>
        <input
          type="text"
          data-testid="name-filter"
          value={ isNome }
          name="isNome"
          onChange={ handleChange }
          placeholder="Nome:"
        />
      </label>
      <div>
        <label>
          <select
            name="column"
            value={ isSearch.column }
            data-testid="column-filter"
            onChange={ onChangeFunc }
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label>
          <select
            name="comparison"
            value={ isSearch.comparison }
            data-testid="comparison-filter"
            onChange={ onChangeFunc }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label>
          <input
            type="number"
            data-testid="value-filter"
            value={ isSearch.number }
            name="number"
            onChange={ onChangeFunc }
          />
        </label>
        <button
          data-testid="button-filter"
          onClick={ buttonclick }
        >
          adicionar filtro
        </button>
      </div>
    </>
  );
}
