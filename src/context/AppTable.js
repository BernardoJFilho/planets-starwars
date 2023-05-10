import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import getApi from '../api/api';

export default function AppTable({ children }) {
  const [isApi, setIsApi] = useState([]);
  const [isName, setIsName] = useState('');

  const arrayApi = useCallback(async () => {
    const response = await getApi();
    setIsApi(response);
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    setIsName(value);
  };

  useEffect(() => {
    arrayApi();
  }, [arrayApi]);

  const values = useMemo(() => ({
    isApi, setIsApi, isName, handleChange,
  }), [isApi, isName]);

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
