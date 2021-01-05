import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  bannerSlider: {
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(2),
    marginInline: theme.spacing(1.5),
    height: '100%',
  },
  title: {
    fontSize: 24,
    color: (theme.palette.type === 'light') ? theme.palette.primary.main : '#fafafa',
    fontWeight: 700,
  }
}));