import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateTime,
  selectTime
} from './timeSlice';

export default function Time({ bold }) {
  const time = useSelector(selectTime);
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      dispatch(updateTime())
    }, 1000);
  }, [dispatch]);

    return (
      <>
        {bold ? <b>{time}</b> : time}
      </>
    );
}