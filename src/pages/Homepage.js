import React, { useEffect, useState } from 'react';
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
  selectStatus as bStatus,
} from '../features/background/backgroundSlice';
import { selectStatus as qStatus } from '../features/quote/quoteSlice';
import '../App.css';

export default function Homepage({ currentVersion }) {
  const pictures = useSelector(selectPictures);
  const currentIndex = useSelector(selectCurrentIndex);
  const backgroundStatus = useSelector(bStatus);
  const quoteStatus = useSelector(qStatus);
  const [weatherStatus, setWeatherStatus] = useState('idle');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPictures());
  }, [dispatch]);

  const BackgroundImage = () => {
    if (backgroundStatus === 'succeeded') {
      return (
        <img
          className='background'
          src={pictures[currentIndex].urls.regular}
          alt={pictures[currentIndex].alt_description}
        />
      );
    }
    return <></>;
  }

  return (
    <>
    {(backgroundStatus === 'loading' || backgroundStatus === 'idle')
      && (weatherStatus === 'loading' || weatherStatus === 'idle')
      && (quoteStatus === 'loading' || quoteStatus === 'idle') ? (
        'Loading...'
    ) : (
        <>
          <BackgroundImage />
          <div className='background-filter' />
          <Settings currentVersion={currentVersion} backgroundStatus={backgroundStatus} weatherStatus={weatherStatus} />
          <div className='info-container'>
            <Date />
            <Time />
            <WeatherContainer setWeatherStatus={setWeatherStatus} />
          </div>
          <div className='goal-container'>
            <NewGoalsForm />
            <Goals />
          </div>
          <Quote />
        </>
      )}
    </>
  );
}