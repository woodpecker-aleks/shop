import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  loginWin: {
    width: '25%'
  },

  loginError: {
    color: theme.palette.error.main
  },

  submitBtn: {
    position: 'relative',
  },

  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));