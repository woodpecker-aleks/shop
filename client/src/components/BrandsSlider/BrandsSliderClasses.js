import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(5)
  },
  slider: {
    maxHeight: '150px',
    color: (theme.palette.type === 'light') ? theme.palette.primary.main : 'white'
  },
  slide: {
  },
  slideImg: {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }
}));