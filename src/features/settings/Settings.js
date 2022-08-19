import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
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
  selectBackgroundToggle,
  toggleBackground
} from '../background/backgroundSlice';
import { selectQuoteToggle, toggleQuote } from '../quote/quoteSlice';
import './Settings.css';

/**
 * The settings to be displayed when user clicks on the settings icon.
 * @param {string} currentVersion - the current version of the application
 * @param {string} backgroundStatus - the status of the background API (pending, fulfilled, rejected)
 * @param {string} weather - the weather response from OpenWeather API used to determine if weather options should be displayed
 */
const Settings = ({ currentVersion, weather, name, setName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editNameState, setEditNameState] = useState(false);
  const tempUnits = useSelector(selectTempUnits);
  const militaryTime = useSelector(selectMilitaryTime);
  const secondsPreference = useSelector(selectSecondsPreference);
  const backgroundToggle = useSelector(selectBackgroundToggle);
  const quoteToggle = useSelector(selectQuoteToggle);
  const dispatch = useDispatch();

  const settingsIcon = <FontAwesomeIcon id="cog-icon" icon={faCog} />;
  const checkIcon = <FontAwesomeIcon id="check-icon" icon={faCheck} />;
  const editIcon = <FontAwesomeIcon id="edit-icon" icon={faPen} />;

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (isOpen === false) {
      setEditNameState(false);
    }
  };

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
  };

  /**
   * Displays what temperature unit is currently being used, and when clicked changes the temperature units
   */
  const WeatherSection = () => {
    if (weather) {
      return (
        <>
          <button className='settings-options' onClick={() => dispatch(toggleTempUnits())}>
            <p className='settings-unit-selector'>{tempUnits === 'F' ? <>Temperature Units: Fahrenheit</> : <>Temperature Units: Celsius</>}</p>
          </button>
        </>
      );
    }
    return <></>;
  };

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
            <div>
              <p className='settings-subtitle'>Name</p>
              <span>
                {editNameState ? (
                  <form onSubmit={submitName}>
                    <span>
                      <input
                        className='settings-unit-selector'
                        id='settings-name-input'
                        type="text"
                        maxLength={10}
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                      {editNameState &&
                        <button id='settings-edit-btn' onClick={(e) => {
                          setEditNameState(!editNameState);
                          submitName(e);
                        }}>
                          {checkIcon}
                        </button>
                      }
                    </span>
                    <p>Name must not exceed 10 characters.</p>
                  </form>
                ) : (
                  <span>
                    <div className='settings-unit-selector' id='settings-name-input'>
                      {name ? name : "-"}
                    </div>
                    &nbsp;
                    {!editNameState &&
                      <button id='settings-edit-btn' onClick={() => {
                        setEditNameState(!editNameState);
                        setEditName(name);
                      }}>
                        {editIcon}
                      </button>
                    }
                  </span>
                )}
              </span>
            </div>
            <div className='settings-unit-control'>
              <p className='settings-subtitle'>Preferences</p>
              <WeatherSection /><br/>
              <button className='settings-options' onClick={() => dispatch(toggleTime())}>
                <p className='settings-unit-selector'>{!militaryTime ? <>Time Format: 12 Hour</> : <>Time Format: 24 Hour</>}</p>
              </button>
              <p className='settings-subtitle'>Display</p>
              <button className='settings-options' onClick={() => dispatch(toggleBackground())}>
                <p className='settings-unit-selector'>{!backgroundToggle ? <>Background: No</> : <>Background: Yes</>}</p>
              </button><br/>
              <button className='settings-options' onClick={() => dispatch(toggleQuote())}>
                <p className='settings-unit-selector'>{!quoteToggle ? <>Quote: No</> : <>Quote: Yes</>}</p>
              </button><br/>
              <button className='settings-options' onClick={() => dispatch(toggleSeconds())}>
                <p className='settings-unit-selector'>{!secondsPreference ? <>Seconds: No</> : <>Seconds: Yes</>}</p>
              </button>
            </div>
            <div id='settings-contact'>
              <p>
                Are you having trouble? Check out the help docs&nbsp;
                <a
                  href='https://github.com/keanuwilliams/inspirational-homepage/wiki/Help'
                  target='_blank'
                  rel='noreferrer'
                  style={{ color: 'black' }}
                >
                  here
                </a>
                .
              </p>
              <p>If you are enjoying Inspirational Homepage, feel free to support the creator using the link below.</p>
              <form action="https://www.paypal.com/donate" method="post" target='_blank'>
                <input type="hidden" name="business" value="648NASS5FJKVS" />
                <input type="hidden" name="no_recurring" value="1" />
                <input type="hidden" name="currency_code" value="USD" />
                <input id='paypal' type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
              </form>
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