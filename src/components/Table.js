import React, { useCallback, useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { api, nome, busca } = useContext(AppContext);
  const [filtered, setFiltered] = useState(api);
  // const [elemet, setElement] = useState(api);

  const filterArray = useCallback((array) => {
    if (!busca || !busca.column) return;
    switch (busca.comparison) {
    case 'maior que':
      return Number(array[busca.column]) > Number(busca.number);
    case 'menor que':
      return Number(array[busca.column]) < Number(busca.number);
    case 'igual a':
      return Number(array[busca.column]) === Number(busca.number);
    default:
    }
  }, [busca]);

  const filterName = useCallback(() => {
    if (busca === undefined) {
      const result = api.filter(({ name }) => name.toLowerCase()
        .includes(nome.toLowerCase()));
      // setElement(result);
      return result;
    }
    const result = filtered;
    // setElement(result);
    return result;
  }, [api, busca, filtered, nome]);

  useEffect(() => {
    if (busca === undefined) {
      return setFiltered(filterName());
    }
    const filterBusca = filterName().filter((array) => (
      busca !== undefined
        ? filterArray(array)
        : array));
    return setFiltered(filterBusca);
  }, [busca, filterArray]);

  // useEffect(() => {
  //   if (filtered.length !== 0) return;
  //   setFiltered(api);
  // }, [filtered.length, api]);

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
