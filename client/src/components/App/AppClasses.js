import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: theme.spacing(12),
    flex: '1 1'
  },
  appBody: {
    minHeight: '100vh',
    position: 'relative',
    backgroundColor: props => (props.theme === 'light') ? '#f3f3f3' : '#212121',
    display: 'flex',
    flexDirection: 'column'
  }
}));