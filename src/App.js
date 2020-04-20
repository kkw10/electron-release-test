import React, { useLayoutEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [version, setVersion] = useState(null);
  const [message, setMessage] = useState('');

  const appVersionRequest = () => {
    window.electronAPI.request('app_version');
    window.electronAPI.response('app_version', (v) => {
      setVersion(v.version);
    })
  };

  const getUpdateMessage = () => {
    window.electronAPI.response('update_message', (v) => {
      console.log(v);
      setMessage(v);
    });
  };

  useLayoutEffect(() => {
    appVersionRequest();
    getUpdateMessage();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <b>
          version: {version ? (version) : ("x.y.z")}
        </b>
        <p className="App-link">
          {message}
        </p>
      </header>
    </div>
  );
}

export default App;
