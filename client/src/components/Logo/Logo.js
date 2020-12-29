import { IconButton, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { memo } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    width: 50,
    height: 50,
    position: 'absolute',
    left: 70,
  },
  svg: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
}));

function Logo(props) {
  const classes = useStyles(props);

  return (
    <IconButton component={NavLink} to="/" className={classes.root}>
      <svg className={classes.svg} width="343" height="322" viewBox="0 0 343 322" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="343" y="320" width="341.482" height="319.576" transform="rotate(179.808 343 320)" fill=""/>
        <rect x="87.9355" y="242.639" width="43" height="164" rx="2" transform="rotate(179.808 87.9355 242.639)" fill="white"/>
        <path d="M158.37 242.362L208.869 242.233L208.782 208.233L178.283 208.311C162.272 204.352 158.908 192.361 158.225 185.862L157.954 79.8628C157.95 78.3628 156.45 78.3666 156.45 78.3666L118.45 78.4638C118.45 78.4638 116.95 78.4676 116.954 79.9676L117.266 201.967C120.533 227.959 146.37 242.393 158.37 242.362Z" fill="white"/>
        <path d="M258.869 242.105L208.369 242.234L208.282 208.235L238.782 208.157C254.772 204.116 258.075 192.107 258.725 185.605L258.454 79.6058C258.45 78.1058 259.95 78.102 259.95 78.102L297.95 78.0048C297.95 78.0048 299.45 78.001 299.454 79.501L299.765 201.501C296.632 227.509 270.869 242.075 258.869 242.105Z" fill="white"/>
        <rect x="231.708" y="179.175" width="43" height="101" rx="2" transform="rotate(179.853 231.708 179.175)" fill="white"/>
      </svg>
    </IconButton>
  );
}

export default memo(Logo);