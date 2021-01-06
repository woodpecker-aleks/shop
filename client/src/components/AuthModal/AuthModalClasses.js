import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  loginWin: {
    width: '25%'
  },

  loginError: {
    color: theme.palette.error.main
  },

  progress: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },

  progressBar: {
    backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.main : '#fafafa'
  },

  dialogContent: {
    position: 'relative'
  }
}));