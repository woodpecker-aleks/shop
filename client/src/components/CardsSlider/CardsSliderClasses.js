import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  slideCard: {
    width: '100%',
    maxWidth: 'auto',
    marginInline: 0,
    marginBottom: 0
  },
  slide: {
    display: 'flex',
    justifyContent: 'center',
  },
  slider: {
    paddingBottom: theme.spacing(4) + 'px !important',
    color: (theme.palette.type === 'light') ? theme.palette.primary.main : '#fafafa',
  }
}));