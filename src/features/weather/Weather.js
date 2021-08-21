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

    return <p id="temp">{tempToDisplay}</p>;
  }

  const weatherIcon = (weather) => {
    if (loading) {
      return;
    }
    const iconSrc = "http://openweathermap.org/img/w/"+weather.weather[0].icon+".png";
    return <img id="weather-icon" src={iconSrc} alt={weather.weather[0].main} />;
  }

  useEffect(() => {
    // Update weather every 15 minutes
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`)
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
      {weatherIcon(weather)}
      {temp(weather)}
    </div>
  );
}