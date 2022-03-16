import React from 'react';
import Homepage from './pages/Homepage';
import './App.css';

function App() {
  const currentVersion = '2.0.0';

  return (
    <>
      <div className="App">
        <Homepage currentVersion={currentVersion} />
      </div>
    </>
  );
}

export default App;
