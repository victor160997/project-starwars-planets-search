import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './Table';

function App() {
  return (
    <div className="App">
      <Provider>
        <Table />
      </Provider>
    </div>
  );
}

export default App;
