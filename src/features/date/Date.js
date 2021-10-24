import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDate, updateDate } from './dateSlice';
import './Date.css';

/**
 * Displays the current date in the format "Month Day, Year" and updates the date every second.
 * When the screen reaches 450px, the date will display as "mm/dd/yyyy".
 * @param {boolean} bold - if included, bolds the date that is displayed
 */
export default function Date({ bold }) {
  const date = useSelector(selectDate);
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      dispatch(updateDate())
    }, 1000);
  }, [dispatch]);

  return (
    <div className='date'>
      {bold ? <strong>{date}</strong> : date}
    </div>
  );
}