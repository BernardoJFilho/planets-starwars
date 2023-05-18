import React, { useCallback, useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { isApi, isNome, isBusca } = useContext(AppContext);
  const [filtered, setFiltered] = useState(isApi);

  const filterArray = useCallback((array) => {
    if (!isBusca || !isBusca.column) return;
    switch (isBusca.comparison) {
    case 'maior que':
      return Number(array[isBusca.column]) > Number(isBusca.number);
    case 'menor que':
      return Number(array[isBusca.column]) < Number(isBusca.number);
    case 'igual a':
      return Number(array[isBusca.column]) === Number(isBusca.number);
    default:
    }
  }, [isBusca]);

  useEffect(() => {
    if (!isBusca || !isBusca.column) return;
    const result = filtered.filter(({ name }) => name.toLowerCase()
      .includes(isNome.toLowerCase()));

    const filterBusca = result.filter((array) => (
      isBusca !== undefined
        ? filterArray(array)
        : array));
    setFiltered(filterBusca);
  }, [filterArray, isApi, isBusca, isNome]);

  useEffect(() => {
    if (filtered.length !== 0) return;
    setFiltered(isApi);
  }, [filtered.length, isApi]);

  return (
    <>
      {/* {isBusca !== undefined ? test.map((param, index) => (
        <div key={ index }>
          Filtro
          {' '}
          {index}
          :
          <p>
            {param.column}
            {' '}
            {param.comparison}
            {' '}
            {param.number}
          </p>
        </div>)) : null} */}
      {/* {console.log(test[test.length - 1])} */}
      <div>Table</div>
      <table>
        <tr>
          <th>Nome</th>
          <th>Periodo de Rotação</th>
          <th>Periodo de Orbital</th>
          <th>Diametro</th>
          <th>Clima</th>
          <th>Gravidade</th>
          <th>Terreno</th>
          <th>Superfice de agua</th>
          <th>Filmes</th>
          <th>População</th>
          <th>Criado</th>
          <th>Editado</th>
          <th>Url</th>
        </tr>
        { filtered
          .map((param, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{param.name}</td>
              <td>{param.rotation_period}</td>
              <td>{param.orbital_period}</td>
              <td>{param.diameter}</td>
              <td>{param.climate}</td>
              <td>{param.gravity}</td>
              <td>{param.terrain}</td>
              <td>{param.surface_water}</td>
              <td>{param.films.map((film) => <p key={ film }>{film}</p>)}</td>
              <td>{param.population}</td>
              <td>{param.created}</td>
              <td>{param.edited}</td>
              <td>{param.url}</td>
            </tr>
          ))}
      </table>
    </>
  );
}
