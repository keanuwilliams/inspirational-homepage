import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateTime,
  selectTime
} from './timeSlice';
import './Time.css';

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