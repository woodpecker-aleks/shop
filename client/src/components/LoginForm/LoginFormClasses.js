import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2)
  },

  input: {
    marginBottom: theme.spacing(2),
  }
}));