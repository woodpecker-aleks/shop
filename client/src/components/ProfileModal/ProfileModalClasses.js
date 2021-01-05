import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    margin: theme.spacing(1)
  },
  avatarButton: {
    padding: 0,
    marginInline: theme.spacing(1)
  }
}));