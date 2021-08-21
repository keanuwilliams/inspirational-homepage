import React from 'react';
import './Weather.css';

export default function Weather({weather, weatherIcon, temp}) {

  return (
    <div className="weather">
      {weatherIcon(weather)}
      {temp(weather)}
    </div>
  );

}