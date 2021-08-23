import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { 
  selectMilitaryTime,
  toggleTime,
} from '../time/timeSlice';
import { 
  selectTempUnits,
  toggleTempUnits
} from '../weather/weatherSlice';
import {
  selectCurrentIndex,
  selectPictures,
  incrementIndex,
  decrementIndex
} from '../background/backgroundSlice';
import './Settings.css';

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const tempUnits = useSelector(selectTempUnits);
  const militaryTime = useSelector(selectMilitaryTime);
  const pictures = useSelector(selectPictures);
  const currentIndex = useSelector(selectCurrentIndex);
  const dispatch = useDispatch();

  const settingsIcon = <i className='fa fa-cog' id='cog'></i>;

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const Popup = () => {
    return (
      <div className='popup-box'>
        <div className='box'>
          <span 
            className='close-icon'
            onClick={togglePopup}
          >
            x
          </span>
          <p id='settings-title'>Settings</p>
          <p className='settings-subtitle'>Units</p>
          <button className='settings-options' onClick={() => dispatch(toggleTempUnits())}>
            <p className='units-selector'>{tempUnits === 'F' ? <><strong>Fahrenheit</strong> / Celsius</> : <>Fahrenheit / <strong>Celsius</strong></>}</p>
          </button>
          <br />
          <button className='settings-options' onClick={() => dispatch(toggleTime())}>
            <p className='units-selector'>{!militaryTime ? <><strong>12 Hour</strong> / 24 Hour</> : <>12 Hour / <strong>24 Hour</strong></>}</p>
          </button>
          <br />
          <div id='settings-background-index-control'>
          <p className='settings-subtitle'>Background</p>
            <button className='settings-index-btn' onClick={() => dispatch(decrementIndex())}>-</button>
            <p id='settings-index'>{currentIndex+1} / {pictures.length}</p>
            <button className='settings-index-btn' onClick={() => dispatch(incrementIndex())}>+</button>
          </div>
          <br />
          <div id='background-creds'>
            <p style={{ display: 'inline' }}>Photo by </p>
            <a href={pictures[currentIndex].user.links.html+'?utm_source=inspirational_homepage&utm_medium=referral'}>{pictures[currentIndex].user.name}</a>
            <p style={{ display: 'inline' }}> on </p>
            <a href='https://unsplash.com/?utm_source=inspirational_homepage&utm_medium=referral'>Unsplash</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <span id='settings-btn'>
        <Button
          secondary
          onClick={togglePopup}
          contents={settingsIcon} 
        />
      </span>
      {isOpen && <Popup />}
    </>
  );
}

export default Settings;