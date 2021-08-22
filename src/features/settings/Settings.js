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
import './Settings.css';

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const tempUnits = useSelector(selectTempUnits);
  const militaryTime = useSelector(selectMilitaryTime);
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
          <button className='settings-options' onClick={() => dispatch(toggleTempUnits())}>
            <p className='units-selector'>{tempUnits === 'F' ? <><strong>Fahrenheit</strong> / Celsius</> : <>Fahrenheit / <strong>Celsius</strong></>}</p>
          </button>
          <br />
          <button className='settings-options' onClick={() => dispatch(toggleTime())}>
            <p className='units-selector'>{!militaryTime ? <><strong>12 Hour</strong> / 24 Hour</> : <>12 Hour / <strong>24 Hour</strong></>}</p>
          </button>
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