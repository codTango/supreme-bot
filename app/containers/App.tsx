import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import Navbar from '../components/navbar/Navbar';
import Titlebar from '../components/titleBar/TitleBar';
import Notification from '../components/notification/Notification';
import loading from '../assets/loading-logo.gif';

export default function App(props: Props) {
  const { children } = props;

  const [ isLoading, setIsLoading ] = useState(true);

  ipcRenderer.on('login success', (event, data) => {
    setTimeout(() => { setIsLoading(false); }, 3000);
  });

  if (isLoading) {
    return (
      <div className="app-loading">
        <img src={loading} alt="loading..." />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Titlebar />
      <Notification />
      <div className="main-region">
        {children}
      </div>
    </>
  );
}
