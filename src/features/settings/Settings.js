import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button/Button';
import {
  selectMilitaryTime,
  toggleTime,
  selectSecondsPreference,
  toggleSeconds,
} from '../time/timeSlice';
import {
  selectTempUnits,
  toggleTempUnits,
} from '../weather/weatherSlice';
import {
  selectCurrentIndex,
  selectPictures,
  selectBackgroundToggle,
  toggleBackground
} from '../background/backgroundSlice';
import './Settings.css';

/**
 * The settings to be displayed when user clicks on the settings icon.
 * @param {string} currentVersion - the current version of the application
 * @param {string} backgroundStatus - the status of the background API (pending, fulfilled, rejected)
 * @param {string} weather - the weather response from OpenWeather API used to determine if weather options should be displayed
 */
const Settings = ({ currentVersion, backgroundStatus, weather, name, setName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editNameState, setEditNameState] = useState(false);
  const tempUnits = useSelector(selectTempUnits);
  const militaryTime = useSelector(selectMilitaryTime);
  const secondsPreference = useSelector(selectSecondsPreference);
  const pictures = useSelector(selectPictures);
  const currentIndex = useSelector(selectCurrentIndex);
  const backgroundToggle = useSelector(selectBackgroundToggle);
  const dispatch = useDispatch();

  const settingsIcon = <FontAwesomeIcon id="cog" icon={faCog} />;

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (isOpen === false) {
      setEditNameState(false);
    }
  }

  const submitName = (e) => {
    e.preventDefault();
    const valid = /^[\w\s-]+$/g.test(editName);
    if (!valid && editName !== "") {
      alert("Name not valid. Name should only contain letters, numbers, hyphens and/or spaces.");
    } else if (editName.length > 10) {
      alert("Name not updated. Name exceeds 10 characters.");
    } else {
      if (editName === "" || /^[\s-]+$/g.test(editName)) {
        setName("");
        setEditName("");
      } else {
        const cleanedName = editName.match(/[\w-]+/g);
        setName(cleanedName.join(" "));
        setEditName(cleanedName);
      }
      const json = JSON.stringify(editName);
      localStorage.setItem('name', json);
      setEditNameState(!editNameState);
    }
  }

  /**
   * Displays what temperature unit is currently being used, and when clicked changes the temperature units
   */
  const WeatherUnitSelector = () => {
    if (weather) {
      return (
        <>
          <p className='settings-label'>Temperature Units: </p>
          <button className='settings-options' onClick={() => dispatch(toggleTempUnits())}>
            <p className='settings-unit-selector'>{tempUnits === 'F' ? <><strong>Fahrenheit</strong> / Celsius</> : <>Fahrenheit / <strong>Celsius</strong></>}</p>
          </button>
        </>
      );
    }
    return <></>;
  }

  /**
   * Displays the current index of background images that were fetched using Unsplash API
   * Changes current index with + and - buttons
   * Displays links to current background image author and Unsplash 
   */
  const BackgroundIndexControl = () => {
    if (backgroundStatus === 'succeeded') {
      return (
        <>
          <div id='settings-background-index-control'>
            <span>
              <p className='settings-subtitle' id='settings-name-subtitle'>Background</p>
              <button id='settings-name-edit-btn' onClick={() => dispatch(toggleBackground())}>
                {backgroundToggle ? "On" : "Off"}
              </button>
            </span>
            <br />
            {backgroundToggle &&
              <>
                <p id='settings-index'>{currentIndex + 1} / {pictures.length}</p>
                <div id='settings-background-creds'>
                  <p style={{ display: 'inline' }}>Photo by </p>
                  <a href={pictures[currentIndex].user.links.html + '?utm_source=inspirational_homepage&utm_medium=referral'} target='_blank' rel='noreferrer'>{pictures[currentIndex].user.name}</a>
                  <p style={{ display: 'inline' }}> on </p>
                  <a href='https://unsplash.com/?utm_source=inspirational_homepage&utm_medium=referral' target='_blank' rel='noreferrer'>Unsplash</a>
                </div>
              </>
            }
          </div>
        </>
      );
    }
    return <></>;
  }

  return (
    <>
      <Button
        secondary
        onClick={togglePopup}
        contents={settingsIcon}
      />
      {isOpen &&
        <div className='popup-box'>
          <div className='box'>
            <span
              className='close-icon'
              onClick={togglePopup}
            >
              x
            </span>
            <p id='settings-title'>Settings</p>
            <div className='settings-unit-control'>
              <span>
                <p className='settings-subtitle' id='settings-name-subtitle'>Name</p>
                <button id='settings-name-edit-btn' onClick={() => {
                  setEditNameState(!editNameState);
                  setEditName(name);
                }}>
                  {editNameState ? "cancel" : "edit"}
                </button>
              </span>
              {editNameState ? (
                <form onSubmit={submitName}>
                  <input
                    className='settings-unit-selector'
                    id='settings-name-input'
                    type="text"
                    maxLength={10}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <p>Name must not exceed 10 characters.</p>
                </form>
              ) : (
                <span>
                  <div className='settings-unit-selector'>{name ? name : "-"}</div>
                </span>
              )}
            </div>
            <div className='settings-unit-control'>
              <p className='settings-subtitle'>Preferences</p>
              <WeatherUnitSelector />
              <p className='settings-label'>Time Format:</p>
              <button className='settings-options' onClick={() => dispatch(toggleTime())}>
                <p className='settings-unit-selector'>{!militaryTime ? <><strong>12 Hour</strong> / 24 Hour</> : <>12 Hour / <strong>24 Hour</strong></>}</p>
              </button>
              <p className='settings-label'>Seconds:</p>
              <button className='settings-options' onClick={() => dispatch(toggleSeconds())}>
                <p className='settings-unit-selector'>{!secondsPreference ? <><strong>Off</strong> / On</> : <>Off / <strong>On</strong></>}</p>
              </button>
            </div>
            <BackgroundIndexControl />
            <div id='settings-contact'>
              <p>
                Check us out on&nbsp;
                <a
                  href='https://github.com/keanuwilliams/inspirational-homepage'
                  target='_blank'
                  rel='noreferrer'
                >
                  Github
                </a>
                &nbsp;for all our updates on future releases.
              </p>
              <p>
                Are you having trouble? Check out the help docs&nbsp;
                <a
                  href='https://github.com/keanuwilliams/inspirational-homepage/wiki/Help'
                  target='_blank'
                  rel='noreferrer'
                >
                  here
                </a>
                .
              </p>
            </div>
            <div id='settings-app-version'>
              <p>Inspirational Homepage v{currentVersion}</p>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Settings;