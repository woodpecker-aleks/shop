import { CircularProgress, Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { lazy, Suspense, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { darkTheme, lightTheme } from '../../muiThemes';
import { getFetchUser } from '../../reducers/appUserReducer';
import AppMenu from '../AppMenu/AppMenu';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Header from '../Header/Header';
import { useStyles } from './AppClasses';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage/ProfilePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

function App() {
  const { theme, auth } = useSelector(store => ({
    theme: store.appTheme,
    auth: store.appAuth
  }));
  const dispatch = useDispatch();
  const { isAuth, token } = auth;
  const activeTheme = createMuiTheme((theme.type === 'light') ? lightTheme : darkTheme);
  const classes = useStyles({ theme: theme.type });

  useEffect(() => {
    if (isAuth) dispatch( getFetchUser(token) );
  }, [isAuth, token, dispatch]);

  const AppRoutes = [
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
    }
  ];

  return (
    <ThemeProvider theme={activeTheme}>
      <Scrollbars style={{ width: '100vw', height: '100vh' }}>
        <Header />
          <AppMenu />
          <div className={classes.appBody}>
            <Container
              component="main"
              className={classes.main}
            >
              <Suspense fallback={<CircularProgress className={classes.loader} />}>
                <Breadcrumb />
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
              </Suspense>
            </Container>
          </div>
      </Scrollbars>
    </ThemeProvider>
  );
}

export default App;
