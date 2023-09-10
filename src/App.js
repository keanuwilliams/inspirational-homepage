import React from 'react';
import Homepage from './pages/Homepage';
import './App.css';

const getVersion = () => {
    return require('../package.json').version;
}

function App() {
  const currentVersion = getVersion();

  return (
    <>
      <div className="App">
        <Homepage currentVersion={currentVersion} />
      </div>
    </>
  );
}

export default App;
