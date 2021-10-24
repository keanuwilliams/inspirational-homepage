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
    }, 1000);
  }, [dispatch]);

    return (
      <div className="time">
        {bold ? <strong>{time}</strong> : time}
      </div>
    );
}