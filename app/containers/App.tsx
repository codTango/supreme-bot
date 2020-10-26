/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import Navbar from '../components/navbar/Navbar';
import Titlebar from '../components/titleBar/TitleBar';
import Notification, { NotificationContext } from '../components/notification/Notification';
import loading from '../assets/loading-logo.gif';

const fakeNotification = [
  { id: 1, mainText: 'Check Email', secondaryText: 'Successful order completed!' },
  { id: 2, mainText: 'Check Email', secondaryText: 'Successful order completed!Successful order completed!' },
  { id: 3, mainText: 'new', secondaryText: 'Successful order!' },
];

export default function App(props) {
  const { children } = props;
  const [ isLoading, setIsLoading ] = useState(true);
  const [ notification, setNotification ] = useState(fakeNotification);

  ipcRenderer.on('login success', (event, data) => {
    setTimeout(() => { setIsLoading(false); }, 3000);
  });

  ipcRenderer.on('login failed', (event, data) => {
    alert(data.msg);
  });

  const handleSetNotification = (value) => {
    fakeNotification.push(value);
    setNotification([...fakeNotification]);
  }

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
      <Notification notificationProp={notification} />
      <NotificationContext.Provider value={{ setNotification: handleSetNotification }}>
        <div className="main-region">
          {children}
        </div>
      </NotificationContext.Provider>
    </>
  );
}
