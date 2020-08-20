import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import Navbar from '../navbar/Navbar';
import './Home.scss';

export default function Home(): JSX.Element {

  return (
    <>
      <Navbar />
    </>
  );
}
