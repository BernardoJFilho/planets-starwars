import React, { useContext, useEffect, useState, useCallback } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { api, nome, busca, submet } = useContext(AppContext);
  const [filtered, setFiltered] = useState(api);

  const filterArray = useCallback((array) => {
    switch (busca.comparison) {
    case 'maior que':
      return Number(array[busca.column]) > Number(busca.number);
    case 'menor que':
      return Number(array[busca.column]) < Number(busca.number);
    case 'igual a':
      return Number(array[busca.column]) === Number(busca.number);
    default:
      return true;
    }
  }, [busca]);

  const ordernaArraySort = useCallback((a, b) => {
    const { order } = submet;
    if (order.sort === 'ASC') return a[order.column] - b[order.column];
    return b[order.column] - a[order.column];
  }, [submet]);

  const ordenaArray = useCallback(() => {
    const { order } = submet;
    const array1 = api.filter((e) => e[order.column] !== 'unknown');
    const array2 = api.filter((e) => e[order.column] === 'unknown');
    const data = [...array1.sort(ordernaArraySort), ...array2];
    return data;
  }, [api, ordernaArraySort, submet]);

  useEffect(() => {
    const applyFilters = () => {
      let filteredData = api;

      if (submet.order.sort.length !== 0) {
        filteredData = ordenaArray();
      }

      if (busca && busca.column) {
        filteredData = filteredData.filter((array) => filterArray(array));
      }

      setFiltered(filteredData);
    };

    applyFilters();
  }, [busca, submet.order.sort.length, api, filterArray, ordenaArray]);

  useEffect(() => {
    if (filtered.length !== 0) return;
    setFiltered(api);
  }, [filtered, api]);

  return (
    <>
      <div>Table</div>
      <table>
        <thead>
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
        </thead>
        <tbody>
          {filtered.filter(({ name }) => name.toLowerCase().includes(nome.toLowerCase()))
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
        </tbody>
      </table>
    </>
  );
}
