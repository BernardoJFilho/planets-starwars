import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
// import getApi from '../api/api';

export default function AppTable({ children }) {
  const [isApi, setIsApi] = useState([]);

  const arrayApi = useCallback(async () => {
    const URL_API = 'https://swapi.dev/api/planets';
    const response = await fetch(URL_API);
    const data = await response.json();
    const array = data.results.filter((param) => delete param.residents);
    setIsApi(array);
  }, []);

  useEffect(() => {
    arrayApi();
  }, [arrayApi]);

  const values = useMemo(() => ({
    isApi, setIsApi,
  }), [isApi, setIsApi]);
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
