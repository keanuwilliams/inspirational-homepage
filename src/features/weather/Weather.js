import React from 'react';
import './Weather.css';

/**
 * Function used to display the weather returned from the OpenWeather API Call in WeatherContainer.js
 * @param {object} weather - the weather object returned from the API call to OpenWeather API
 * @param {function} weatherDescription - the function to display the weather description
 * @param {function} weatherIcon - the function to determine which icon to display based on the weather
 * @param {function} temp - the function to display the correctly formatted temperature
 * @returns 
 */
const Weather = ({weather, weatherIcon, weatherDescription, temp}) => {

  if (!weather) { // Do not display temperature or icon if nothing is returned from API Call
    return <></>;
  }

  return (
    <div className="weather">
      {weatherIcon(weather)}
      &nbsp;
      {weatherDescription(weather)}
      &nbsp;
      {temp(weather)}
    </div>
  );

}

export default Weather;