import { CircularProgress, Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Suspense, useEffect, useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../muiThemes';
import { getFetchUser } from '../../redux/reducers/appUserReducer';
import AppMenu from '../AppMenu/AppMenu';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import RouterController from '../RouterController/RouterController';
import { useStyles } from './AppClasses';

function App() {
  const { theme, auth } = useSelector(store => ({
    theme: store.appTheme,
    auth: store.appAuth
  }));
  const dispatch = useDispatch();
  const { isAuth, token } = auth;
  const activeTheme = createMuiTheme((theme.type === 'light') ? lightTheme : darkTheme);
  const classes = useStyles({ theme: theme.type });
  const scrollbarStyles = useMemo(() => ({ width: '100vw', height: '100vh' }), []);

  useEffect(() => {
    if (isAuth) dispatch( getFetchUser(token) );
  }, [isAuth, token, dispatch]);

  return (
    <Scrollbars style={scrollbarStyles}>
      <ThemeProvider theme={activeTheme}>
        <Header />
        <AppMenu />
        <div className={classes.appBody}>
          <Container
            component="main"
            className={classes.main}
          >
            <Suspense fallback={<CircularProgress className={classes.loader} />}>
              <Breadcrumb />
              <RouterController />
            </Suspense>
          </Container>
          <Footer />
        </div>
      </ThemeProvider>
    </Scrollbars>
  );
}

export default App;
