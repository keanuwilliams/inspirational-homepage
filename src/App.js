import React from 'react';
import Homepage from './pages/Homepage';
import './App.css';

function App() {
  const currentVersion = '1.7.0';

  return (
    <>
      <div className="App">
        <Homepage currentVersion={currentVersion} />
      </div>
    </>
  );
}

export default App;
