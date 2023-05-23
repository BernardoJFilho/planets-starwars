import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import getApi from '../api/api';

const columns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const comparison = [
  'maior que',
  'menor que',
  'igual a',
];

export default function AppTable({ children }) {
  const [api, setApi] = useState([]);
  const [nome, setNome] = useState('');
  const [busca, setBusca] = useState();
  const [columnValues, setColumsValues] = useState(columns);
  const [comparisonValues] = useState(comparison);
  const [submet, setSubmet] = useState({ order: { column: '', sort: '' } });

  const arrayApi = useCallback(async () => {
    const response = await getApi();
    setApi(response);
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    setNome(value);
  };

  useEffect(() => {
    arrayApi();
  }, [arrayApi]);

  const values = useMemo(() => ({
    api,
    setApi,
    nome,
    handleChange,
    busca,
    setBusca,
    setColumsValues,
    columnValues,
    comparisonValues,
    setSubmet,
    submet,
  }), [api, busca, columnValues, comparisonValues, nome, submet]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppTable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
