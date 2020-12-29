import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'stretch'
  },
  slider: {
    width: '50%',
    padding: theme.spacing(2)
  }
}));