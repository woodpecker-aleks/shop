import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },

  link: {
    display: 'flex',
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
    height: '100%',
  },

  listItemIcon: {
    margin: 'auto 0',
  },

  listItemArrow: {
    margin: 'auto 0',
  },

  listItemBody: {
    display: 'flex',
  }
}));