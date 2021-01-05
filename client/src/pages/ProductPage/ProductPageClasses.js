import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start'
  },
  productSlider: {
    width: 'calc(50% - 20px)',
    height: 380
  },
}));