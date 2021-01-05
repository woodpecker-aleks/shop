import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import clsx from 'clsx';
import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import useGlobalStyles from '../../globalClasses';
import { toggleAppMenu } from '../../redux/reducers/appMenuReducer';
import Logo from "../Logo/Logo";
import Navigation from '../Navigation/Navigation';
import SearchField from '../SearchField/SearchField';
import { useStyles } from './HeaderClasses';
import HeaderToolBar from "./HeaderToolBar";

function Header() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const glClasses = useGlobalStyles();
  const dispatchToggleAppMenu = useCallback(() => dispatch( toggleAppMenu() ), [dispatch]);

  return (
    <AppBar
      position="fixed"
      className={classes.root}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={dispatchToggleAppMenu}
          className={clsx(classes.menuButton, glClasses.iconButton)}
        >
          <MenuSharpIcon />
        </IconButton>
        <Logo />
        <Navigation />
        <SearchField className={classes.searchField} />
        <HeaderToolBar />
      </Toolbar>
    </AppBar>
  );
}

export default memo(Header);