import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { isApi, isName } = useContext(AppContext);

  return (
    <>
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
          <th>Filme</th>
          <th>População</th>
          <th>Criado</th>
          <th>Editado</th>
          <th>Url</th>
        </tr>
        { isApi.filter(({ name }) => name.toLowerCase().includes(isName.toLowerCase()))
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
          )) }
      </table>
    </>
  );
}
