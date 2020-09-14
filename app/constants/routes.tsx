import React from 'react';
import ProfilePage from '../containers/ProfilePage';
import CaptchaPage from '../containers/CaptchaPage';
import AnalyticsPage from '../containers/AnalyticsPage';
import SettingPage from '../containers/SettingPage';

// Lazy load task page
const LazyTaskPage = React.lazy(() =>
  import(/* webpackChunkName: "TaskPage" */ '../containers/TaskPage')
);
const TaskPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyTaskPage {...props} />
  </React.Suspense>
);

// Lazy load proxy page
const LazyProxyPage = React.lazy(() =>
  import(/* webpackChunkName: "ProxyPage" */ '../containers/ProxyPage')
);

const ProxyPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyProxyPage {...props} />
  </React.Suspense>
);

const routes = [
  {
    path: "/analytics",
    component: AnalyticsPage
  },
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
    path: "/captcha",
    component: CaptchaPage
  },
  {
    path: "/setting",
    component: SettingPage
  }
];

export default routes;
