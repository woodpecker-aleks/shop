import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Paper, TextField, Typography } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { Skeleton } from '@material-ui/lab';
import { useFormik } from "formik";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { emailValidator, LOADING, phoneValidator, wordValidator } from "../../constants";
import { logout } from '../../redux/reducers/appAuthReducer';
import { deleteFetchUser, updateFetchUser } from '../../redux/reducers/appUserReducer';
import useStyles from "./ProfilePageClasses";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function ProfilePage() {
  const user = useSelector(store => store.appUser);
  const dispatch = useDispatch();
  const fileField = useRef(null);
  const form = useRef(null);
  const history = useHistory();
  const classes = useStyles();
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [clearAvatar, setClearAvatar] = useState(false);

  useEffect(() => {
    document.title = 'Profile';
  }, []);

  const handleLogout = () => {
    history.push('/');
    dispatch( logout() );
  }

  const handleDeleteAccount = () => {
    history.push('/');
    dispatch( deleteFetchUser() );
    dispatch( logout() );
  }

  const { errors, touched, getFieldProps } = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email
    },
    validate(values) {
      const errors = {};

      if (!wordValidator.test(values.firstName)) {
        errors.firstName = 'Invalid first name'
      }

      if (values.lastName && !wordValidator.test(values.lastName)) {
        errors.lastName = 'Invalid first name'
      }
      
      if (!emailValidator.test(values.email)) {
        errors.email = 'Invalid email adress';
      }

      if (values.phone && !phoneValidator.test(values.phone)) {
        errors.phone = 'Invalid phone number';
      }

      return errors;
    }
  });

  const handleProfileChange = () => {
    const formData = new FormData(form.current);

    if (clearAvatar) formData.append('clearAvatar', true);

    dispatch( updateFetchUser(formData) );

    setIsReadOnly(true);
  }

  return (
    <Paper
      variant="outlined"
      className={classes.root}
    >
      <Typography
        variant="h3"
        className={classes.title}
      >
        Profile
      </Typography>
      <Divider />
      <form
        ref={form}
        className={classes.body}
      >
        <div className={classes.avatarWrapper}>
          {user.status === LOADING ? (
            <Skeleton variant="circle">
              <Avatar className={classes.avatar}>U</Avatar>
            </Skeleton>
          ) : (
            <Avatar
              src={user.avatar && `/images/avatars/${user.avatar}`}
              alt="avatar"
              className={classes.avatar}
            >
              {user.firstName && user.firstName[0]}
            </Avatar>
          )}
          {(!isReadOnly) && (<>
            <IconButton className={classes.editBtn}>
              <label
                htmlFor="avatar-image"
                className={classes.fileInputLabel}
              >
                <EditIcon />
              </label>
            </IconButton>
            <IconButton
              className={classes.deleteAvatarBtn}
              onClick={() => setClearAvatar(true)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </>)}
        </div>
        <div className={classes.fieldGroup}>
          {(user.status === LOADING) ? (<>
            <Skeleton width="100%">
              <TextField className={classes.input} />
            </Skeleton>
            <Skeleton width="100%">
              <TextField className={classes.input} />
            </Skeleton>
            <Skeleton width="100%">
              <TextField className={classes.input} />
            </Skeleton>
            <Skeleton width="100%">
              <TextField className={classes.input} />
            </Skeleton>
          </>) : (<>
            <TextField
              {...getFieldProps('firstName')}
              defaultValue={user.firstName}
              label="First name"
              error={touched.firstName && errors.firstName}
              helperText={touched.firstName && errors.firstName}
              color="secondary"
              className={classes.input}
              inputProps={{
                readOnly: isReadOnly
              }}
            />
            <TextField
              {...getFieldProps('lastName')}
              defaultValue={user.lastName}
              label="Last name"
              error={touched.lastName && errors.lastName}
              helperText={touched.lastName && errors.lastName}
              color="secondary"
              className={classes.input}
              inputProps={{
                readOnly: isReadOnly
              }}
            />
            <TextField
              {...getFieldProps('email')}
              defaultValue={user.email}
              label="Email"
              error={touched.email && errors.email}
              helperText={touched.email && errors.email}
              color="secondary"
              className={classes.input}
              inputProps={{
                readOnly: isReadOnly
              }}
            />
            <TextField
              {...getFieldProps('phone')}
              defaultValue={user.phone}
              label="Phone"
              error={touched.phone && errors.phone}
              helperText={touched.phone && errors.phone}
              color="secondary"
              className={classes.input}
              inputProps={{
                readOnly: isReadOnly
              }}
            />
          </>)}
          <input
            ref={fileField}
            className={classes.fileInput}
            name="avatar"
            id="avatar-image"
            type="file"
          />
          <Dialog
            open={isOpenModal}
            onClose={() => setIsOpenModal(false)}
            aria-labelledby="Are you sure?"
            aria-describedby="Do you want to delete account?"
          >
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
              <DialogContentText>Do you want to delete account?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={handleDeleteAccount}
                className={classes.deleteBtn}
              >
                Delete account
              </Button>
              <Button onClick={() => setIsOpenModal(false)}>Back</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className={classes.control}>
          <Button
            variant="outlined"
            className={classes.deleteBtn}
            onClick={() => setIsOpenModal(true)}
          >
            Delete Account
          </Button>
          <Button
            onClick={handleLogout}
            className={classes.logoutBtn}
            variant="outlined"
          >
            Log out
          </Button>
          <Button
            onClick={(isReadOnly) ? () => setIsReadOnly(false) : handleProfileChange}
            variant="outlined"
            className={classes.changesBtn}
          >
            {(isReadOnly) ? 'Edit profile' : 'Save changes'}
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default ProfilePage;