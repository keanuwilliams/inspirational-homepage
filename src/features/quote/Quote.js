import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectQuote,
  selectAuthor,
  fetchQuotes,
  selectStatus,
  generateQuote
} from './quoteSlice';
import './Quote.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

/**
 * Displays the fetched quote onto the screen within a round rectangle. 
 */
export default function Quote() {
  const quote = useSelector(selectQuote);
  const author = useSelector(selectAuthor);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  const syncIcon = <FontAwesomeIcon id="sync-icon" icon={faSync} />;

  useEffect(() => {
    dispatch(fetchQuotes());
  }, [dispatch]);

  // return empty div if fetching a quote from API has failed
  if (status === 'failed') {
    return (
      <div></div>
    );
  }

  return (
    <div className='quote-group'>
      {status === 'loading' ? <p>Loading Quote...</p> : (
        <>
          <button id='sync-btn' onClick={() => dispatch(generateQuote())}>{syncIcon}</button>
          <p id='quote'>"{quote}"</p>
          <p><b>{author}</b></p>
        </>
      )}
    </div>
  );
}