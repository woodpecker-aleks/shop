import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    backgroundColor: theme.palette.primary.dark,
    color: '#fafafa',
    paddingBlock: theme.spacing(2)
  },
  navigation: {
    display: 'flex',
    justifyContent: 'center'
  }
}));