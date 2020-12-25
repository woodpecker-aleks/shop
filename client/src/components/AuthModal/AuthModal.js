import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { SwitchMany, SwitchOnce } from '../../jsxOperators';
import { login } from '../../reducers/appAuthReducer';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useStyles } from './AuthModalClasses';

function AuthModal(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [tab, setTab] = useState('sing in');
  const { request, loading, error, clearError } = useHttp();
  const [loginIsValid, setLoginIsValid] = useState(false);
  const [registerIsValid, setRegisterIsValid] = useState(false);

  const loginHandler = async (values) => {
    try {
      const { email, password } = values;

      const { token, userId } = await request('/api/auth/login', 'POST', { email, password });

      dispatch( login({ token, userId }) );
    } catch (err) {}
  }

  const registerHandler = async (values) => {
    try {
      const {email, password, phone, firstName, lastName} = values;

      await request('/api/auth/register', 'POST', { email, password, firstName, lastName, phone });
    } catch (error) {}
  }

  const closeHandler = () => {
    setTab('sing in');
    props.onClose();
    clearError();
  }

  return (
    <Dialog
      open={props.open}
      onClose={closeHandler}
      aria-labelledby="sing in"
      aria-describedby="sing in to your account"
      classes={{ paper: classes.loginWin}}
    >
      <DialogTitle>
        {(tab === 'sing in') ? 'SING IN' : 'SING UP'}
      </DialogTitle>
      <Divider />
      <DialogContent>

        {SwitchMany()
          .Case(error)(() => (
            <DialogContentText className={classes.loginError}>{error.message}</DialogContentText>
          ))
          .Case(tab === 'sing in')(() => (
            <LoginForm
              onSubmit={loginHandler}
              valid={setLoginIsValid}
            />
          ))
          .Case(tab === 'sing up')(() => (
            <RegisterForm
              onSubmit={registerHandler}
              valid={setRegisterIsValid}
            />
          ))
          .End()
        }

      </DialogContent>
      <DialogActions>

        {SwitchOnce()
          .Case(tab === 'sing in')(() => (<>
          
            <Button
              type="submit"
              form="login"
              variant="outlined"
              className={classes.submitBtn}
              color="inherit"
              disabled={loading || !loginIsValid}
            >
              {loading && <CircularProgress className={classes.progress} size={24} />}
              Sing In
            </Button>
            <Button
              onClick={() => setTab('sing up')}
            >
              Sing Up
            </Button>

          </>))
          .Case(tab === 'sing up')(() => (<>

            <Button
              onClick={() => setTab('sing in')}
              disabled={loading}
            >
              Sing In
            </Button>
            <Button
              type="submit"
              form="register"
              variant="outlined"
              className={classes.submitBtn}
              color="inherit"
              disabled={loading || !registerIsValid}
            >
              {loading && <CircularProgress className={classes.progress} size={24} />}
              Sing Up
            </Button>

          </>))
          .End()
        }
      </DialogActions>
    </Dialog>
  );
}

export default AuthModal;