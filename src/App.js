import React, { useLayoutEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [appInfo, setAppInfo] = useState(null);
  const [message, setMessage] = useState('');

  const appVersionRequest = () => {
    window.electronAPI.request('app_info');
    window.electronAPI.response('app_info', (v) => {
      console.log(v);
      setAppInfo(v);
    })
  };

  const getUpdateMessage = () => {
    window.electronAPI.response('update_message', (v) => {
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
          version : {appInfo && appInfo.version ? (appInfo.version) : ("x.y.z")}
        </b>
        <b>
          platform : {appInfo && appInfo.platform ? (appInfo.platform) : ("unknown")}
        </b>
        <b>
          feedURL : {appInfo && appInfo.feedURL ? (appInfo.feedURL) : ("unknown")}
        </b>
        <p className="App-link">
          {message}
        </p>
      </header>
    </div>
  );
}

export default App;
