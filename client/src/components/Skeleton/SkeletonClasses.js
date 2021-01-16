import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  grow: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}));