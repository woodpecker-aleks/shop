import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  profile: {
    width: 'calc(50% - 20px)',
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column'
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto'
  },
  title: {
    padding: theme.spacing(2)
  },
  body: {
    position: 'relative',
    paddingBlock: theme.spacing(2),
    paddingInline: theme.spacing(3),
    display: 'flex',
    flexWrap: 'wrap'
  },
  input: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  control: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  fileInput: {
    display: 'none'
  },
  fileInputLabel: {
    height: 24,
    cursor: 'pointer'
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    fontSize: theme.spacing(15)
  },
  fieldGroup: {
    flex: '1 1'
  },
  editBtn: {
    position: 'absolute',
    bottom: '-30px',
    right: 0,
    color: theme.palette.info.main
  },
  deleteAvatarBtn: {
    position: 'absolute',
    bottom: '-30px',
    left: 0,
    color: theme.palette.error.main
  },
  avatarWrapper: {
    position: 'relative',
    alignSelf: 'start',
    marginRight: theme.spacing(3),
  },
  logoutBtn: {
    marginRight: theme.spacing(2)
  },
  deleteBtn: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main
  },
  changesBtn: {
    color: theme.palette.info.main,
    borderColor: theme.palette.info.main
  },
  orders: {
    width: '50%',
    marginLeft: theme.spacing(3)
  },
  order: {
    marginBottom: theme.spacing(3),
    position: 'relative'
  },
  orderHeader: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    color: 'gray',
    alignItems: 'center'
  },
  orderBody: {
    paddingInline: theme.spacing(2),
    paddingBlock: theme.spacing(1)
  },
  orderFooter: {
    color: 'gray',
    paddingBlock: theme.spacing(1),
    paddingInline: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  time: {
    fontSize: 14
  }
}));