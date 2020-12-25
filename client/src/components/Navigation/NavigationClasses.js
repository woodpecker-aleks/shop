import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
  },

  navLink: {
    marginLeft: theme.spacing(4),
    color: 'inherit',
    textDecoration: 'none',
  },
}));