import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: theme.spacing(5),
    width: '20%',
    backgroundColor: (theme.palette.type === 'light') ? '#fafafa' : theme.palette.primary.light,
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },

  divider: {
    height: 28,
    margin: 4,
  },
}));