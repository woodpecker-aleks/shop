import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    width: 'calc(50% - 20px)',
  },
  productName: {
    fontWeight: 500,
  },
  productHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBlock: theme.spacing(2),
    marginInline: theme.spacing(3),
  },
  productActionBar: {
    marginBlock: theme.spacing(2),
    marginInline: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  success: {
    color: theme.palette.success.main,
    display: 'flex',
    alignItems: 'center',
    marginInline: theme.spacing(3),
    marginTop: theme.spacing(2)
  },
  error: {
    color: theme.palette.error.main,
    display: 'flex',
    alignItems: 'center',
    marginInline: theme.spacing(3),
    marginTop: theme.spacing(2)
  },
  statusIcon: {
    marginRight: theme.spacing(1)
  },
  productPrice: {
  },
  productBuyBtn: {
    color: 'white',
    backgroundColor: theme.palette.success.main,
    marginLeft: theme.spacing(3),
    paddingInline: theme.spacing(3)
  },
  productLikeBtn: {
    marginLeft: theme.spacing(3)
  },
  productDescription: {
    marginBlock: theme.spacing(2),
    marginInline: theme.spacing(4)
  },
  cardOldPrice: {
    color: 'gray',
    fontSize: '1rem',
    marginLeft: theme.spacing(2),
  },
  cardNewPrice: {
  },
  productSaleTimer: {
    top: `${theme.spacing(-1.5)}px !important`,
    right: `${theme.spacing(-1.5)}px !important`,
  },
  activeLikeIcon: {
    color: theme.palette.error.main
  }
}));