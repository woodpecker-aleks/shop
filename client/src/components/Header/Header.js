import { AppBar, Button, IconButton, Toolbar, Tooltip } from "@material-ui/core";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import clsx from 'clsx';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGlobalStyles from '../../globalClasses';
import { toggleAppMenu } from '../../reducers/appMenuReducer';
import AuthModal from '../AuthModal/AuthModal';
import Logo from "../Logo/Logo";
import Navigation from '../Navigation/Navigation';
import ProfileModal from "../ProfileModal/ProfileModal";
import SearchField from '../SearchField/SearchField';
import { useStyles } from './HeaderClasses';

function Header() {
  const isAuth = useSelector(store => store.appAuth.isAuth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const glClasses = useGlobalStyles();
  const [loginModalisOpen, setLoginModalisOpen] = useState(false);

  return (
    <AppBar
      position="fixed"
      className={classes.root}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => dispatch( toggleAppMenu() )}
          className={clsx(classes.menuButton, glClasses.iconButton)}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Logo />
        <Navigation />
        <SearchField className={classes.searchField} />
        <Tooltip
          title="Liked"
          placement="bottom"
        >
          <IconButton
            color="inherit"
            className={clsx(classes.iconButton, glClasses.iconButton)}
          >
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Notification"
          placement="bottom"
        >
          <IconButton
            color="inherit"
            className={clsx(classes.iconButton, glClasses.iconButton)}
          >
            <NotificationsNoneOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Card"
          placement="bottom"
        >
          <IconButton
            color="inherit"
            className={clsx(classes.iconButton, glClasses.iconButton)}
          >
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Tooltip>
        {(isAuth) ? (
            <ProfileModal />
        ) : (
          <>
            <Button
              variant="outlined"
              color="inherit"
              className={classes.loginButton}
              onClick={() => setLoginModalisOpen(true)}
            >
              Sing In
            </Button>
            <AuthModal
              open={loginModalisOpen}
              onClose={() => setLoginModalisOpen(false)}
            />
          </>
        )
        }
      </Toolbar>
    </AppBar>
  );
}

export default Header;