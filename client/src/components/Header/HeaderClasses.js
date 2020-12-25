import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  root: {
    height: theme.spacing(8),
  },

  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    position: 'relative'
  },

  menuButton: {
    marginRight: 'auto',
  },

  iconButton: {
    margin: '0 3px',
  },

  searchField: {
    margin: '0 auto',
  },

  loginButton: {
    marginLeft: theme.spacing(1)
  }
}));