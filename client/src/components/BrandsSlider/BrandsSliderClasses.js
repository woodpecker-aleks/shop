import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(5),
    padding: theme.spacing(1),
  },
  slider: {
    color: (theme.palette.type === 'light') ? theme.palette.primary.main : 'white',
    maxHeight: '150px'
  },
  slide: {
    height: '100%',
    marginInline: theme.spacing(0.5)
  },
  slideImg: {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '5px'
  }
}));