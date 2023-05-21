import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

export default function Search() {
  const {
    isNome,
    handleChange,
    setBusca,
    columnValues,
    setColumsValues,
    comparisonValues,
  } = useContext(AppContext);

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
    setColumsValues(columnValues.filter((item) => item !== search.column));
    setBusca(search);
  };

  useEffect(() => {
    setSearch((prev) => ({ ...prev, column: columnValues[0] }));
  }, [columnValues]);

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
            {columnValues.map((param, index) => <option key={ index }>{param}</option>)}
          </select>
        </label>
        <label>
          <select
            name="comparison"
            value={ search.comparison }
            data-testid="comparison-filter"
            onChange={ onChangeFunc }
          >
            {comparisonValues.map((param, index) => (
              <option key={ index }>{param}</option>))}
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
