import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: theme.spacing(5),
    width: '20%',
    backgroundColor: (theme.palette.type === 'light') ? '#fafafa' : theme.palette.primary.light,
    position: 'relative',
    overflow: 'visible !important'
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },

  divider: {
    height: 28,
    margin: 4,
  },

  loader: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  progressBar: {
    backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.main : '#fafafa'
  },
  resultsList: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 'calc(100% + 10px)',
    zIndex: 20,
  },
  notFoundTitle: {
    textAlign: 'center',
    padding: theme.spacing(1),
    display: 'block'
  }
}));