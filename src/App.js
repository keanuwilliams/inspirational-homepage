import React from 'react';
import logo from './logo.svg';
import Homepage from './pages/Homepage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Homepage />
      </header>
    </div>
  );
}

export default App;
