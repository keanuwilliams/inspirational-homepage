import React, { useEffect, useState } from 'react';
import { selectTempUnits } from './weatherSlice';
import Weather from './Weather';
import { useSelector } from 'react-redux';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export default function WeatherContainer({ weather, setWeather }) {
  const [loading, setLoading] = useState(true);
  const tempUnits = useSelector(selectTempUnits);

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
    if (loading || !weather) {
      return;
    }
    const iconSrc = "https://openweathermap.org/img/w/"+weather.weather[0].icon+".png";
    return <img id="weather-icon" src={iconSrc} alt={weather.weather[0].main} />;
  }

  const fetchWeather = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.cod === 200) {
              setWeather(data);
            }
            setLoading(false);
          })
      });
    }
  }

  useEffect(() => {
    fetchWeather();
    // Update every 15 minutes
    setInterval(() => {
      fetchWeather();
    }, 900000);
  }, []); // dependency array left blank, since fetchWeather is being updated using setInterval

  return <Weather weather={weather} weatherIcon={weatherIcon} temp={temp} />;
}