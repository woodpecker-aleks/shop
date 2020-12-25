import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  card: {
    width: 'calc(25% - 35px)',
    maxWidth: '280px',
    minWidth: '200px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  cardMedia: {
    height: '180px',
    backgroundSize: '40%'
  },
  cardTitle: {
    marginBottom: theme.spacing(1),
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
    marginBottom: theme.spacing(1),
  },
  cardLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));