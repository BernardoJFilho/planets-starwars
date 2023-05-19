import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import getApi from '../api/api';

export default function AppTable({ children }) {
  const [api, setApi] = useState([]);
  const [nome, setNome] = useState('');
  const [busca, setBusca] = useState();

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
    api, setApi, nome, handleChange, busca, setBusca,
  }), [api, busca, nome]);

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
