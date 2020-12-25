import { Box, Divider, IconButton, InputBase } from "@material-ui/core";
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import Search from '@material-ui/icons/Search';
import clsx from 'clsx';
import { useRef, useState } from "react";
import useGlobalStyles from '../../globalClasses';
import { useStyles } from './SearchFieldClasses';

function SearchField(props) {
  const classes = useStyles(props);
  const glClasses = useGlobalStyles();
  const input = useRef(null);
  const [inputHasValue, setInputHasValue] = useState(false);

  const validateFieldValue = () => {
    if (input.current.value !== '') setInputHasValue(true);
    else setInputHasValue(false);
  }

  const cleanFieldValue = () => {
    input.current.value = '';
    setInputHasValue(false);
  }

  return (
    <Box
      borderRadius={3}
      component="form"
      className={clsx(classes.root, props.className)}
    >
      <IconButton
        className={glClasses.iconButton}
        aria-label="search"
      >
        <Search />
      </IconButton>
      <Divider
        className={classes.divider}
        orientation="vertical"
      />
      <InputBase
        inputRef={input}
        placeholder="Search gadget"
        onChange={validateFieldValue}
        className={classes.input}
      />
      <Divider
        className={classes.divider}
        orientation="vertical"
      />
      <IconButton
        disabled={!inputHasValue}
        className={glClasses.iconButton}
        aria-label="clean"
        onClick={cleanFieldValue}
      >
        <BackspaceOutlinedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default SearchField;