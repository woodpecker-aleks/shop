import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  productAvatar: {
    objectFit: 'contain'
  },
  productNameCell: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  productAvatarCell: {
    marginRight: theme.spacing(2)
  },
  productCount: {
    marginInline: theme.spacing(1)
  }
}));