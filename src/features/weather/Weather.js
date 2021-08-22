import React from 'react';
import './Weather.css';

const Weather = ({weather, weatherIcon, temp}) => {

  return (
    <div className="weather">
      {weatherIcon(weather)}
      {temp(weather)}
    </div>
  );

}

export default Weather;