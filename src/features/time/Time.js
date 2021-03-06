import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateTime,
  selectTime
} from './timeSlice';
import './Time.css';

/**
 * Displays the current time using the user's preferences.
 * @param {boolean} bold - if included, displays the time in bold 
 */
export default function Time({ bold }) {
  const time = useSelector(selectTime);
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      dispatch(updateTime())
    }, 100);
  }, [dispatch]);

    return (
      <span className="time">
        {bold ? <strong>{time}</strong> : time}
      </span>
    );
}