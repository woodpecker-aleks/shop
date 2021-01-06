import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, LinearProgress } from '@material-ui/core';
import { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { login } from '../../redux/reducers/appAuthReducer';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import { useStyles } from './AuthModalClasses';
import { callAlert } from '../../redux/reducers/appAlertReducer';

function AuthModal({ onClose, open, ...props }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [tab, setTab] = useState('sing in');
  const { request, status } = useHttp();
  const [loginIsValid, setLoginIsValid] = useState(false);
  const [registerIsValid, setRegisterIsValid] = useState(false);

  const loginHandler = useCallback(async (values) => {
    try {
      const { email, password } = values;

      const { token, userId, error } = await request('/api/auth/login', 'POST', { email, password });

      if (error) return dispatch( callAlert({ children: 'Failed login!', type: 'error' }) );

      dispatch( login({ token, userId }) );

      dispatch( callAlert({ children: 'Congratulations, you logined!', type: 'success' }) );

    } catch (err) {}
  }, [dispatch, request]);

  const registerHandler = useCallback(async (values) => {
    try {
      const {email, password, phone, firstName, lastName} = values;

      const { error } = await request('/api/auth/register', 'POST', { email, password, firstName, lastName, phone });

      if (error) return dispatch( callAlert({ children: 'Failed register!', type: 'error' }) );

      dispatch( callAlert({ children: 'Congratulations, you registrated!', type: 'success' }) );
    } catch (err) {}
  }, [dispatch, request]);

  const closeHandler = useCallback(() => {
    setTab('sing in');
    onClose();
  }, [onClose]);

  let errorText;
  if (status.isError) {
    errorText = <DialogContentText className={classes.loginError}>{status.message}</DialogContentText>;
  }

  let form;
  if (tab === 'sing in') {
    form = (
      <LoginForm
        onSubmit={loginHandler}
        valid={setLoginIsValid}
      />
    )
  } else {
    form = (
      <RegisterForm
        onSubmit={registerHandler}
        valid={setRegisterIsValid}
      />
    )
  }

  let actions;
  if (tab === 'sing in') {
    actions = (<>
      <Button
        type="submit"
        form="login"
        variant="outlined"
        color="inherit"
        disabled={status.isLoading || !loginIsValid}
      >
        Sing In
      </Button>
      <Button
        onClick={() => setTab('sing up')}
      >
        Sing Up
      </Button>
    </>)
  } else {
    actions = (<>
      <Button
        onClick={() => setTab('sing in')}
        disabled={status.isLoading}
      >
        Sing In
      </Button>
      <Button
        type="submit"
        form="register"
        variant="outlined"
        color="inherit"
        disabled={status.isLoading || !registerIsValid}
      >
        Sing Up
      </Button>
    </>)
  }

  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      aria-labelledby="sing in"
      aria-describedby="sing in to your account"
      classes={{ paper: classes.loginWin}}
    >
      <DialogTitle>
        {(tab === 'sing in') ? 'SING IN' : 'SING UP'}
      </DialogTitle>
      <Divider />
      <DialogContent className={classes.dialogContent}>
        {status.isLoading && (
          <LinearProgress
            className={classes.progress}
            classes={{ bar: classes.progressBar }} 
          />)}
        {errorText}
        {form}
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  );
}

export default memo(AuthModal);