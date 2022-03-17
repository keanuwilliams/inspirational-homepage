import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button/Button';
import Spinner from '../components/Spinner/Spinner';
import Greeting from '../features/greeting/Greeting';
import Time from '../features/time/Time';
import Quote from '../features/quote/Quote';
import Date from '../features/date/Date';
import WeatherContainer from '../features/weather/WeatherContainer';
import Settings from '../features/settings/Settings';
import {
  fetchPictures,
  selectCurrentIndex,
  selectPictures,
  selectBackgroundToggle,
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
  const [name, setName] = useState("");
  const currentIndex = useSelector(selectCurrentIndex);
  const backgroundStatus = useSelector(bStatus);
  const backgroundToggle = useSelector(selectBackgroundToggle);
  const quoteStatus = useSelector(qStatus);
  const dispatch = useDispatch();
  const leftArrow = <FontAwesomeIcon className="homepage-arrow-icon" icon={faArrowLeft} />;
  const rightArrow = <FontAwesomeIcon className="homepage-arrow-icon" icon={faArrowRight} />;

  const getName = () => {
    const json = localStorage.getItem('name');
    if (json !== null) {
      return JSON.parse(json);
    } else {
      return "";
    }
  }

  useEffect(() => {
    const fetchedName = getName();
    if (fetchedName.length > 10) {
      setName("")
    } else {
      setName(fetchedName);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchPictures());
  }, [dispatch]);

  const BackgroundImage = () => {
    if (backgroundStatus === 'succeeded' && backgroundToggle) {
      return (
        <img
          className='background'
          src={pictures[currentIndex].urls.regular}
          alt={pictures[currentIndex].alt_description}
        />
      );
    }
    return (
      <div className='background' id='blank-background' />
    );
  }

  const LeftIndexBtn = () => {
    if (currentIndex === 0) return <Button disabled onClick={() => dispatch(decrementIndex())} contents={leftArrow} />;
    return <Button primary onClick={() => dispatch(decrementIndex())} contents={leftArrow} />;
  }

  const RightIndexBtn = () => {
    if (currentIndex === pictures.length-1) return <Button disabled onClick={() => dispatch(incrementIndex())} contents={rightArrow} />
    return <Button primary onClick={() => dispatch(incrementIndex())} contents={rightArrow} />
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
            {backgroundToggle && <LeftIndexBtn />}
            <Settings currentVersion={currentVersion} backgroundStatus={backgroundStatus} weather={weather} name={name} setName={setName} />
            {backgroundToggle && <RightIndexBtn />}
          </div>
          <div className='weather-container'>
            <WeatherContainer weather={weather} setWeather={setWeather} />
          </div>
          <div className='info-container'>
            <Date /><br/>
            <Time />
            <Greeting name={name}/>
          </div>
          <Quote />
        </>
      )}
    </>
  );
}