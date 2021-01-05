import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { useEffect, useMemo, useState, memo } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../muiThemes';
import { getFetchUser } from '../../redux/reducers/appUserReducer';
import AppAlert from '../AppAlert/AppAlert';
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
  const { isAuth } = auth;
  const [appTheme, setTheme] = useState(createMuiTheme( lightTheme ));
  const classes = useStyles({ theme: theme.type });
  const scrollbarStyles = useMemo(() => ({ width: '100vw', height: '100vh' }), []);

  useEffect(() => {
    if (isAuth) dispatch( getFetchUser() );
  }, [isAuth, dispatch]);

  useEffect(() => {
    if (theme.type === 'light') setTheme( createMuiTheme(lightTheme) );
    else setTheme( createMuiTheme(darkTheme) );
  }, [theme.type]);

  return (
    <Scrollbars style={scrollbarStyles}>
      <ThemeProvider theme={appTheme}>
        <Header />
        <AppMenu />
        <div className={classes.appBody}>
          <Container
            component="main"
            className={classes.main}
          >
            <Breadcrumb />
            <RouterController />
          </Container>
          <Footer />
        </div>
        <AppAlert />
      </ThemeProvider>
    </Scrollbars>
  );
}

export default memo(App);
