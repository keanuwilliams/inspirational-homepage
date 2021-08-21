import React, { useEffect, useState } from 'react';
import './Weather.css';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export default function Weather() {
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(true);
  const tempUnits = 'F';

  const temp = (weather) => {
    if (loading) {
      return;
    }

    let tempToDisplay = weather.main.temp - 273.15;

    if (tempUnits === 'F') {
      tempToDisplay = tempToDisplay * 1.8 + 32;
    }

    tempToDisplay = tempToDisplay.toFixed(1);

    if (tempUnits === 'F') {
      tempToDisplay = `${tempToDisplay}°F`;
    } else {
      tempToDisplay = `${tempToDisplay}°C`;
    }

    return tempToDisplay;
  }

  useEffect(() => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&mode=json`)
          .then((response) => response.json())
          .then((data) => {
            setWeather(data);
            setLoading(false);
          })
      });
    }
  }, []);

  return (
    <div className="weather">
      {temp(weather)}
    </div>
  );
}