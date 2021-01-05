import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, TextField } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useFormik } from "formik";
import { memo, useState } from "react";
import { emailValidator, passwordValidator, phoneValidator, wordValidator } from "../../../constants";
import { useStyles } from './RegisterFormClasses';

function RegisterForm({ valid, onSubmit, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles(props)
  
  const { touched, errors, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      firstName: '',
      lastName: ''
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
      
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required';
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'No match between passwords';
      }
      if (!values.firstName) {
        errors.firstName = 'First name is required';
      } else if (!wordValidator.test(values.firstName)) {
        errors.firstName = 'Invalid first name';
      }

      if (values.lastName && !wordValidator.test(values.lastName)) {
        errors.lastName = 'Invalid last name';
      }

      if (values.phone && !phoneValidator.test(values.phone)) {
        errors.phone = 'Invalid phone number';
      }

      if (!errors.email && !errors.password && !errors.confirmPassword && !errors.firstName) valid(true);

      return errors;
    },
    onSubmit(values, {setSubmitting}) {
      onSubmit(values);
      setSubmitting(false);
    }
  });

  return (
    <form
      id="register"
      onSubmit={handleSubmit}
      className={classes.loginForm}
    >
      <TextField
        error={Boolean(touched.firstName && errors.firstName)}
        label="First name"
        {...getFieldProps('firstName')}
        helperText={touched.firstName && errors.firstName}
        className={classes.input}
        autoComplete="off"
        color="secondary"
      />
      <TextField
        error={Boolean(touched.lastName && errors.lastName)}
        label="Last name"
        {...getFieldProps('lastName')}
        helperText={touched.lastName && errors.lastName}
        className={classes.input}
        autoComplete="off"
        color="secondary"
      />
      <TextField
        error={Boolean(touched.email && errors.email)}
        label="Email"
        {...getFieldProps('email')}
        helperText={touched.email && errors.email}
        className={classes.input}
        autoComplete="off"
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
          autoComplete="off"
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
      <FormControl
        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
        className={classes.input}
      >
        <InputLabel
          color="secondary"
          htmlFor="confirm-password-field"
        >
          Confirm password
        </InputLabel>
        <Input
          id="confirm-password-field"
          type={(showPassword) ? 'text' : 'password'}
          {...getFieldProps('confirmPassword')}
          autoComplete="off"
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
        {touched.confirmPassword && errors.confirmPassword && (
          <FormHelperText>{errors.confirmPassword}</FormHelperText>
        )}
      </FormControl>
      <TextField
        error={Boolean(touched.phone && errors.phone)}
        label="Phone"
        {...getFieldProps('phone')}
        helperText={touched.phone && errors.phone}
        className={classes.input}
        autoComplete="on"
        color="secondary"
      />
    </form>
  );
}

export default memo(RegisterForm);