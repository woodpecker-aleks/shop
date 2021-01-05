import { Checkbox, FormControl, FormControlLabel, FormHelperText, IconButton, Input, InputAdornment, InputLabel, TextField } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useFormik } from "formik";
import { memo, useState } from "react";
import { useStyles } from './LoginFormClasses';
import { emailValidator, passwordValidator } from '../../../constants';

function LoginForm({ valid, onSubmit, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles(props);
  
  const { errors, touched, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false
    },
    validate(values) {
      const errors = {};
      
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!emailValidator.test(values.email)) {
        errors.email = 'Invalid email adress';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      } else if (!passwordValidator.test(values.password)) {
        errors.password = 'Invalid password';
      }

      if (!errors.password && !errors.email) valid(true);

      return errors;
    },
    onSubmit(values, {setSubmitting}) {
      onSubmit(values);
      setSubmitting(false);
    }
  });

  return (
    <form
      id="login"
      onSubmit={handleSubmit}
      className={classes.loginForm}
    >
      <TextField
        error={Boolean(touched.email && errors.email)}
        label="Email"
        helperText={touched.email && errors.email}
        {...getFieldProps('email')}
        className={classes.input}
        autoComplete="on"
        color="secondary"
      />
      <FormControl
        error={Boolean(touched.password && errors.password)}
        className={classes.input}
      >
        <InputLabel
          color="secondary"
          htmlFor="password-field"
        >
          Password
        </InputLabel>
        <Input
          id="password-field"
          type={(showPassword) ? 'text' : 'password'}
          {...getFieldProps('password')}
          autoComplete="on"
          color="secondary"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {(showPassword) ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {touched.password && errors.password && (
          <FormHelperText>{errors.password}</FormHelperText>
        )}
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox 
            {...getFieldProps('remember')}
            color="secondary"
          />
        }
        label="Remember me"
      />
    </form>
  );
}

export default memo(LoginForm);