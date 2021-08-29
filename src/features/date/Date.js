import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDate, updateDate } from './dateSlice';
import './Date.css';

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