import React from 'react';
import logo from './logo.svg';
import { Time } from './features/time/Time';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Time />
      </header>
    </div>
  );
}

export default App;
