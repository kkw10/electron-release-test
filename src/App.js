import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [version, setVersion] = useState(null);

  window.electronAPI.request('app_version');
  window.electronAPI.response('app_version', (v) => {
    setVersion(v.version);
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <b>
          version: {version ? (version) : ("x.y.z")}
        </b>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
