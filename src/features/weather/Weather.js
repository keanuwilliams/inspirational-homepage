import React from 'react';
import './Weather.css';

export default function Weather() {
  const weather = "92.8 °F";

    return (
      <div className="weather">
        {weather}
      </div>
    );
}