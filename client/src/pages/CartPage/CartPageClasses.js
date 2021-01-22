import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
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
  },
  table: {
    marginBottom: theme.spacing(2),
    position: 'relative',
    minHeight: '200px'
  },
  submitBtn: {
    marginLeft: 'auto'
  },
  textArea: {
    marginLeft: 'auto',
    maxWidth: '20%',
    marginBottom: theme.spacing(2)
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto'
  }
}));