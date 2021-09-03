import React from 'react';
import './Weather.css';

const Weather = ({weather, weatherIcon, temp}) => {

  if (!weather) {
    return <></>;
  }

  return (
    <div className="weather">
      {weatherIcon(weather)}
      {temp(weather)}
    </div>
  );

}

export default Weather;