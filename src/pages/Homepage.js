import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Time from '../features/time/Time';
import Goals from '../features/goals/Goals';
import Quote from '../features/quote/Quote';
import Date from '../features/date/Date';
import WeatherContainer from '../features/weather/WeatherContainer';
import Settings from '../features/settings/Settings';
import NewGoalsForm from '../components/NewGoalsForm';
import { 
  fetchPictures, 
  selectCurrentIndex, 
  selectPictures, 
  selectStatus,
} from '../features/background/backgroundSlice';
import '../App.css';

export default function Homepage({ currentVersion }) {
  const pictures = useSelector(selectPictures);
  const currentIndex = useSelector(selectCurrentIndex);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPictures());
  }, [dispatch]);

  return (
    <>
    {status === 'succeeded' ? (
        <>
          <img
            className='background'
            src={pictures[currentIndex].urls.regular}
            alt={pictures[currentIndex].alt_description}
          />
          <div className='background-filter' />
          <Settings currentVersion={currentVersion} />
          <div className='info-container'>
            <Date />
            <Time />
            <WeatherContainer />
          </div>
          <div className='goal-container'>
            <NewGoalsForm />
            <Goals />
          </div>
          <Quote />
        </>
      ) : 'Loading...'}
    </>
  );
}