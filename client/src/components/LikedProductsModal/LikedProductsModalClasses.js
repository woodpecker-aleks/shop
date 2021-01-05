import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  changesDot: {
    backgroundColor: theme.palette.error.main,
    color: '#fafafa'
  },
  notFoundText: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 'auto',
    textAlign: 'center',
    height: theme.spacing(2)
  },
  productAvatar: {
    objectFit: 'contain'
  },
  progress: {
    color: theme.palette.type === 'light' ? theme.palette.primary.main : 'white',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 'auto'
  },
  deleteBtn: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(0.5)
  },
  likedProductsList: {
    position: 'relative',
    height: '100%'
  }
}));