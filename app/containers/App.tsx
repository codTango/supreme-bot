import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import Navbar from '../components/navbar/Navbar';
import Titlebar from '../components/titleBar/TitleBar';
import Notification from '../components/notification/Notification';
import loading from '../assets/loading-logo.gif';

const fakeNotification = [
  { id: 1, mainText: 'Check Email', secondaryText: 'Successful order completed!' },
  { id: 2, mainText: 'Check Email', secondaryText: 'Successful order completed!Successful order completed!' },
  { id: 3, mainText: 'new', secondaryText: 'Successful order!' },
];

export default function App(props: Props) {
  const { children } = props;

  const [ isLoading, setIsLoading ] = useState(true);

  ipcRenderer.on('login success', (event, data) => {
    setTimeout(() => { setIsLoading(false); }, 3000);
  });

  ipcRenderer.on('login failed', (event, data) => {
    alert(data.msg);
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
      <Notification notificationProp={fakeNotification} />
      <div className="main-region">
        {children}
      </div>
    </>
  );
}
