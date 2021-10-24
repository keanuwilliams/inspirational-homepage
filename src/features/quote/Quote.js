import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectQuote,
  selectAuthor,
  fetchQuotes,
  selectStatus
} from './quoteSlice';
import './Quote.css';

/**
 * Displays the fetched quote onto the screen within a round rectangle. 
 */
export default function Quote() {
  const quote = useSelector(selectQuote);
  const author = useSelector(selectAuthor);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

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
      {status === 'loading' ? <p>Loading...</p> : (
        <>
          <p>"{quote}"</p>
          <p><b>{author}</b></p>
        </>
      )}
    </div>
  );
}