import React from 'react';
import './App.css';
import Table from './components/Table';
import Search from './components/Search';
import AppTable from './context/AppTable';

function App() {
  return (
    <AppTable>
      <Search />
      <Table />
    </AppTable>
  );
}
export default App;
