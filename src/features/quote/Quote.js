import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectQuote,
  selectAuthor,
  fetchQuotes,
  selectStatus
} from './quoteSlice';

export default function Quote() {
  const quote = useSelector(selectQuote);
  const author = useSelector(selectAuthor);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuotes());
  }, [dispatch]);

  return (
    <div>
      {status === 'loading' ? <p>Loading...</p> : (
        <>
          <p>{quote}</p>
          <p>- {author}</p>
        </>
      )}
    </div>
  );
}