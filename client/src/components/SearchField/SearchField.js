import { Divider, IconButton, InputBase, LinearProgress, List, ListItem, Paper, ListItemText, Typography } from "@material-ui/core";
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import clsx from 'clsx';
import { memo, useCallback, useEffect, useMemo, useState, useRef } from "react";
import { LOADING, POST } from "../../constants";
import { debounce } from "../../functions";
import useGlobalStyles from '../../globalClasses';
import { useHttp } from "../../hooks/http.hook";
import { useStyles } from './SearchFieldClasses';
import { Link } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';

function SearchField({ className, ...props }) {
  const classes = useStyles(props);
  const glClasses = useGlobalStyles();
  const rootRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [inputHasValue, setInputHasValue] = useState(false);
  const { request, status } = useHttp();
  const [results, setResults] = useState(null);

  const linearProgressClasses = useMemo(() => ({
    bar: classes.progressBar
  }), [classes.progressBar]);

  const scrollbarStyles = useMemo(() => ({ height: '50vh' }), []);

  const requestForSearch = useCallback(inputValue => {
    request('/api/products', POST, {
      filter: { name: inputValue }
    })
    .then(products => setResults(products));
  }, [request]);

  const debounceRequest = useMemo(() => debounce(requestForSearch, 500), [requestForSearch]);

  const validateFieldValue = useCallback(() => {
    if (inputValue) setInputHasValue(true);
    else setInputHasValue(false);
  }, [inputValue]);

  const cleanFieldValue = useCallback(() => {
    setInputValue('');
    setInputHasValue(false);
    setResults(null);
  }, []);

  const handleChange = useCallback(event => {
    validateFieldValue();
    setInputValue(event.target.value);
  }, [validateFieldValue]);

  const handleOuterClick = useCallback(event => {
    if (!rootRef.current.contains(event.target)) cleanFieldValue();
  }, [cleanFieldValue]);

  useEffect(() => {
    if (inputValue) debounceRequest(inputValue);
  }, [debounceRequest, inputValue]);

  useEffect(() => {
    if (inputValue) window.addEventListener('click', handleOuterClick);

    return () => window.removeEventListener('click', handleOuterClick);
  }, [inputValue, handleOuterClick]);

  let resultsList;
  if (results && results.length) resultsList = (
    <Paper
      className={classes.resultsList}
      onClick={cleanFieldValue}
    >
      <Scrollbars style={scrollbarStyles}>
        <List
          component="ul"
          aria-label="search results"
        >
          {results.map(result => {
            const startMatchIndex = result.name.toLowerCase().indexOf(inputValue);
            const endMatchIndex = startMatchIndex + inputValue.length;
            const beforeMatch = result.name.slice(0, startMatchIndex);
            const afterMatch = result.name.slice(endMatchIndex, result.name.length - 1);
            const match = result.name.slice(startMatchIndex, endMatchIndex);

            return (
              <ListItem
                key={result._id}
                button
                component={Link}
                to={`/product/${result.url}`}
              >
                <ListItemText primary={<span>{beforeMatch}<b>{match}</b>{afterMatch}</span>} />
              </ListItem>
            )
          })}
        </List>
      </Scrollbars>
    </Paper>
  )
  else if (results && !results.length) resultsList = (
    <Paper
      className={classes.resultsList}
      onClick={cleanFieldValue}
    >
      <Typography
        variant="button"
        className={classes.notFoundTitle}
      >
        No Matches
      </Typography>
    </Paper>
  )

  return (
    <Paper
      variant="outlined"
      className={clsx(classes.root, className)}
      ref={rootRef}
    >
      {status === LOADING && (
        <LinearProgress
          className={classes.loader}
          classes={linearProgressClasses}
        />
      )}
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
        value={inputValue}
        placeholder="Search gadget"
        onChange={handleChange}
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
      {resultsList}
    </Paper>
  );
}

export default memo(SearchField);