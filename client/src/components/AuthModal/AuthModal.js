import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@material-ui/core';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { login } from '../../redux/reducers/appAuthReducer';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import { useStyles } from './AuthModalClasses';

function AuthModal({ onClose, open, ...props }) {
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
    onClose();
    clearError();
  }

  let errorText = null;
  if (error) {
    errorText = <DialogContentText className={classes.loginError}>{error.message}</DialogContentText>;
  }

  let form = null;
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

  let actions = null;
  if (tab === 'sing in') {
    actions = (<>
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
    </>)
  } else {
    actions = (<>
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
      <DialogContent>
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