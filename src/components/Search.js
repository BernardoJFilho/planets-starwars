import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

const optionsValues = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

export default function Search() {
  const { isNome, handleChange, setBusca } = useContext(AppContext);
  const [values, setValues] = useState(optionsValues);
  const [search, setSearch] = useState({
    column: 'population',
    comparison: 'maior que',
    number: 0,
  });

  const onChangeFunc = ({ target }) => {
    const { name, value } = target;
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const buttonclick = () => {
    setValues(optionsValues.filter((item) => item !== search.column));
    setBusca(search);
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
            value={ search.column }
            data-testid="column-filter"
            onChange={ onChangeFunc }
          >
            {values.map((param, index) => <option key={ index }>{param}</option>)}
          </select>
        </label>
        <label>
          <select
            name="comparison"
            value={ search.comparison }
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
            value={ search.number }
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
