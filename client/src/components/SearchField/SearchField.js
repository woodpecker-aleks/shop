import { Divider, IconButton, InputBase, LinearProgress, List, ListItem, Paper, ListItemText, Typography, Collapse } from "@material-ui/core";
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import clsx from 'clsx';
import { memo, useCallback, useEffect, useMemo, useState, useRef } from "react";
import { POST } from "../../constants";
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
  const { request, status } = useHttp();
  const [results, setResults] = useState(null);
  const [resultsIsOpen, setResultsIsOpen] = useState(false);
  const transitionTime = 500;

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

  const cleanFieldValue = useCallback(() => {
    setResultsIsOpen(false);
    setInputValue('');
    setTimeout(() => setResults(null), transitionTime);
  }, [transitionTime]);

  const handleChange = useCallback(event => {
    setInputValue(event.target.value);
  }, []);

  const handleOuterClick = useCallback(event => {
    if (!rootRef.current.contains(event.target)) cleanFieldValue();
  }, [cleanFieldValue]);

  useEffect(() => {
    if (inputValue) debounceRequest(inputValue);
  }, [debounceRequest, inputValue]);

  useEffect(() => {
    if (resultsIsOpen) window.addEventListener('click', handleOuterClick);

    return () => window.removeEventListener('click', handleOuterClick);
  }, [resultsIsOpen, handleOuterClick]);

  useEffect(() => {
    if (results) setResultsIsOpen(true);
  }, [results]);

  let resultsList;
  if (results && results.length) resultsList = (
    <Paper
      onClick={cleanFieldValue}
      elevation={3}
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
            const afterMatch = result.name.slice(endMatchIndex, result.name.length);
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
      onClick={cleanFieldValue}
      elevation={3}
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
      {status.isLoading && (
        <LinearProgress
          className={classes.progress}
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
        disabled={!inputValue}
        className={glClasses.iconButton}
        aria-label="clean"
        onClick={cleanFieldValue}
      >
        <BackspaceSharpIcon fontSize="small" />
      </IconButton>
      <Collapse
        className={classes.resultsList}
        in={resultsIsOpen}
        timeout={transitionTime}
      >
        {resultsList}
      </Collapse>
    </Paper>
  );
}

export default memo(SearchField);