import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: theme.spacing(12),
    flex: '1 1'
  },
  appBody: {
    backgroundColor: props => (props.theme === 'light') ? 'white' : '#212121',
    minHeight: '100vh',
    position: 'relative'
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto'
  }
}));