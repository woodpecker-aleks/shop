import { Divider, IconButton, InputBase, Paper } from "@material-ui/core";
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import clsx from 'clsx';
import { memo, useRef, useState } from "react";
import useGlobalStyles from '../../globalClasses';
import { useStyles } from './SearchFieldClasses';

function SearchField({ className, ...props }) {
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
    <Paper
      variant="outlined"
      className={clsx(classes.root, className)}
    >
      <IconButton
        className={glClasses.iconButton}
        aria-label="search"
      >
        <SearchSharpIcon />
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
        <BackspaceSharpIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
}

export default memo(SearchField);