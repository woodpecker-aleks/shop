import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  selectedTab: {
    color: (theme.palette.type === 'light') ? theme.palette.primary.main : 'white !important',
  },
  tabsScroller: {
    backgroundColor: (theme.palette.type === 'light') ? theme.palette.primary.main : 'white'
  }
}));