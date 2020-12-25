import { makeStyles } from '@material-ui/core';

const drawerWidth = '20%';

export const useStyles = makeStyles(theme => ({
  root: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 99,
  },
  paper: {
    width: drawerWidth,
    backgroundColor: (theme.palette.type === 'light') ? 'white' : theme.palette.primary.dark,
  },
  menu: {
    paddingTop: theme.spacing(9),
  },
  menuIconButton: {
    padding: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  switchThumb: {
    backgroundColor: (theme.palette.type === 'light') ? 'gray' : 'white',
  },
  backdrop: {
    zIndex: 10,
  }
}));