import React, { ReactNode } from 'react';
import Navbar from '../components/navbar/Navbar';
import Titlebar from '../components/titleBar/TitleBar';
import Notification from '../components/notification/Notification';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
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
