import { Avatar, Button, Divider, IconButton, Popover } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { LOADING } from "../../constants";
import { If } from '../../jsxOperators';
import { logout } from '../../reducers/appAuthReducer';
import { useStyles } from "./ProfileModalClasses";

function ProfileModal() {
  const user = useSelector(store => store.appUser);
  const dispatch = useDispatch();
  const [modalAnchor, setModalEnchor] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  
  const handleOpenModal = event => {
    setModalEnchor(event.currentTarget);
  }

  const handleCloseModal = () => {
    setModalEnchor(null)
  }

  const handleLogout = () => {
    history.push('/');
    dispatch( logout() );
  }

  return If(user.status === LOADING)(() => (
    <Skeleton variant="circle">
      <Avatar />
    </Skeleton>
  ))
  .Else(() => (<>
    <IconButton
      color="inherit"
      onClick={handleOpenModal}
    >
      <Avatar src={user.avatar && `/images/avatars/${user.avatar}`} alt="avatar">
        {user.firstName && user.firstName[0]}
      </Avatar>
    </IconButton>
    <Popover
      onClose={handleCloseModal}
      open={Boolean(modalAnchor)}
      anchorEl={modalAnchor}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div className={classes.modal}>
        <Button component={NavLink} to="/profile" onClick={handleCloseModal} className={classes.button}>View Profile</Button>
        <Divider />
        <Button onClick={handleLogout} className={classes.button}>Log out</Button>
      </div>
    </Popover>
  </>))
}

export default ProfileModal;