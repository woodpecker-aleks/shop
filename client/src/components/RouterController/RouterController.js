import { Redirect, Route, Switch } from 'react-router-dom';
import { lazy, useMemo } from 'react';
import { useSelector } from 'react-redux';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const ProfilePage = lazy(() => import('../../pages/ProfilePage/ProfilePage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
const ProductPage = lazy(() => import('../../pages/ProductPage/ProductPage'));

function RouterController() {
  const isAuth = useSelector(store => store.appAuth.isAuth);

  const AppRoutes = useMemo(() => ([
    {
      exact: true,
      path: '/',
      component: HomePage
    },
    {
      path: '/profile',
      condition: isAuth,
      component: ProfilePage
    },
    {
      path: '/not-found',
      component: NotFoundPage
    },
    {
      path: '/product/:url',
      component: ProductPage
    }
  ]), [isAuth]);

  return (
    <Switch>
      {AppRoutes.map(route => (route.condition || route.condition === undefined) && (
        <Route
          key={route.path}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      ))}
      <Redirect to="not-found" />
    </Switch>
  )
}

export default RouterController;