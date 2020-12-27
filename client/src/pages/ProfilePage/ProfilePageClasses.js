import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
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
  }
}));