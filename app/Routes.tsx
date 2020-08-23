/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import routes from './constants/routes';
import App from './containers/App';

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default function Routes() {
  return (
    <App>
      <Switch>
        <Redirect exact from="/" to="/home" />
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </App>
  );
}
