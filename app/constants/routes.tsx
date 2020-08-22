import React from 'react';
import HomePage from '../containers/HomePage';
import ProfilePage from '../containers/ProfilePage';
import ProxyPage from '../containers/ProxyPage';
import CaptchaPage from '../containers/CaptchaPage';
import AnalyticsPage from '../containers/AnalyticsPage';
import SettingPage from '../containers/SettingPage';

// Lazily load routes and code split with webpack
const LazyCounterPage = React.lazy(() =>
  import(/* webpackChunkName: "CounterPage" */ '../containers/TaskPage')
);

const TaskPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

const routes = [
  {
    path: "/task",
    component: TaskPage
  },
  {
    path: "/profile",
    component: ProfilePage
  },
  {
    path: "/proxy",
    component: ProxyPage
  },
  {
    path: "/analytics",
    component: AnalyticsPage
  },
  {
    path: "/setting",
    component: SettingPage
  },
  {
    path: "/captcha",
    component: CaptchaPage
  },
  {
    path: "/",
    component: HomePage
  }
];

export default routes;
