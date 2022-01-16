import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button/Button';
import Spinner from '../components/Spinner/Spinner';
import Greeting from '../features/greeting/Greeting';
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
  incrementIndex,
  decrementIndex,
  selectStatus as bStatus,
} from '../features/background/backgroundSlice';
import { selectStatus as qStatus } from '../features/quote/quoteSlice';
import '../App.css';

/**
 * The page to be displayed with all of the components.
 * @param {string} currentVersion - the current version of the application 
 */
export default function Homepage({ currentVersion }) {
  const pictures = useSelector(selectPictures);
  const [weather, setWeather] = useState();
  const currentIndex = useSelector(selectCurrentIndex);
  const backgroundStatus = useSelector(bStatus);
  const quoteStatus = useSelector(qStatus);
  const dispatch = useDispatch();
  const leftArrow = <FontAwesomeIcon className="homepage-arrow-icon" icon={faArrowLeft} />;
  const rightArrow = <FontAwesomeIcon className="homepage-arrow-icon" icon={faArrowRight} />;

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
        && (quoteStatus === 'loading' || quoteStatus === 'idle') ? (
        <Spinner />
      ) : (
        <>
          <BackgroundImage />
          <div className='background-filter' />
          <div id='homepage-btns'>
            {currentIndex === 0 ? 
              <Button disabled onClick={() => dispatch(decrementIndex())} contents={leftArrow} />
            : <Button primary onClick={() => dispatch(decrementIndex())} contents={leftArrow} />
            }
            <Settings currentVersion={currentVersion} backgroundStatus={backgroundStatus} weather={weather} />
            {currentIndex === 9 ? 
              <Button disabled onClick={() => dispatch(incrementIndex())} contents={rightArrow} />
            : <Button primary onClick={() => dispatch(incrementIndex())} contents={rightArrow} />
            }
          </div>
          <div className='info-container'>
            <Greeting />
            <div id='date-time-container'>
              <Date />&nbsp;<Time />
            </div>
            <WeatherContainer weather={weather} setWeather={setWeather} />
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