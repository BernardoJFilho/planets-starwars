import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import getApi from '../api/api';

export default function AppTable({ children }) {
  const [isApi, setIsApi] = useState([]);
  const [isNome, setIsNome] = useState('');
  const [isBusca, setIsBusca] = useState();

  const arrayApi = useCallback(async () => {
    const response = await getApi();
    setIsApi(response);
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    setIsNome(value);
  };

  useEffect(() => {
    arrayApi();
  }, [arrayApi, isBusca]);

  const values = useMemo(() => ({
    isApi, setIsApi, isNome, handleChange, setIsBusca, isBusca,
  }), [isApi, isBusca, isNome]);

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
