import React, { ReactNode } from 'react';
import Navbar from '../components/navbar/Navbar';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  return (
    <>
      <Navbar />
      <div style={{marginLeft: '100px'}}>
        {children}
      </div>
    </>
  );
}
