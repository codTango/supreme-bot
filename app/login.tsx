import React from 'react';
import { render } from 'react-dom';
import './app.global.scss';

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const LoginPage = require('./containers/LoginPage').default;

  render(
    <LoginPage />,
    document.getElementById('login-root')
  );
});
