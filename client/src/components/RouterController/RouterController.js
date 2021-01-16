import { Redirect, Route, Switch } from 'react-router-dom';
import { lazy, useMemo, memo, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { useStyles } from './RouterControllerClasses';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const ProfilePage = lazy(() => import('../../pages/ProfilePage/ProfilePage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
const ProductPage = lazy(() => import('../../pages/ProductPage/ProductPage'));
<<<<<<< HEAD
const CartPage = lazy(() => import('../../pages/CartPage/CartPage'));
=======
const CardPage = lazy(() => import('../../pages/CardPage/CardPage'));
>>>>>>> 3fdf54a64d164a4164d1823d2da6c8e267874d56
const RedirectToHome = () => <Redirect to="/" />

function RouterController() {
  const isAuth = useSelector(store => store.appAuth.isAuth);
  const classes = useStyles();

  const AppRoutes = useMemo(() => ([
    {
      exact: true,
      path: '/',
      component: HomePage
    },
    {
      exact: true,
      path: '/product',
      component: RedirectToHome
    },
    {
      exact: true,
      path: '/profile',
      condition: isAuth,
      component: ProfilePage
    },
    {
      exact: true,
      path: '/not-found',
      component: NotFoundPage
    },
    {
      exact: true,
      path: '/product/:url',
      component: ProductPage
    },
    {
      exact: true,
<<<<<<< HEAD
      path: '/cart',
      component: CartPage
=======
      path: '/card',
      component: CardPage
>>>>>>> 3fdf54a64d164a4164d1823d2da6c8e267874d56
    }
  ]), [isAuth]);

  return (
    <Suspense fallback={<CircularProgress className={classes.loader} />}>
      <Switch>
        {AppRoutes.map(route => (route.condition || route.condition === undefined) && (
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />
        ))}
        <Redirect to="/not-found" />
      </Switch>
    </Suspense>
  )
}

export default memo(RouterController);