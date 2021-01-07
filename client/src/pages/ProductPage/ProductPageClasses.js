import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: theme.spacing(3)
  },
  productSlider: {
    width: 'calc(50% - 20px)',
    height: 380
  },

  moreSlider: {
    marginTop: theme.spacing(3)
  },

  title: {
    fontSize: 24,
    color: (theme.palette.type === 'light') ? theme.palette.primary.main : '#fafafa',
    fontWeight: 700,
  }
}));