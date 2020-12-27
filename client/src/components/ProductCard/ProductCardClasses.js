import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  card: {
    width: 'calc(25% - 35px)',
    maxWidth: '280px',
    minWidth: '200px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingTop: theme.spacing(5),
    position: 'relative'
  },
  cardMedia: {
    height: '180px',
    backgroundSize: 'contain'
  },
  cardTitle: {
    marginBottom: theme.spacing(1),
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 18
  },
  cardBody: {
    padding: '15px 25px',
  },
  cardFooter: {
    justifyContent: 'space-between',
  },
  cardPrice: {
    display: 'flex',
  },
  cardOldPrice: {
    color: 'gray',
    fontSize: '1rem',
    marginLeft: theme.spacing(2),
  },
  cardNewPrice: {
  },
  descriptionList: {
    paddingLeft: '20px',
    lineHeight: '25px',
    marginBottom: theme.spacing(2),
  },
  cardLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
  positive: {
    color: theme.palette.success.main
  },
  negative: {
    color: theme.palette.error.main
  },
  cardRating: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '15px',
    padding: theme.spacing(0.5),
  },
  cardSaleTimer: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 10,
    paddingInline: theme.spacing(1),
    paddingBlock: theme.spacing(0.5),
    borderRadius: '15px',
    backgroundColor: (theme.palette.type === 'light') ? theme.palette.primary.main : 'gray',
    color: '#fafafa'
  }
}));