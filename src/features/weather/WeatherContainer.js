import React, { useCallback, useEffect, useState } from 'react';
import { selectTempUnits } from './weatherSlice';
import Weather from './Weather';
import { useSelector } from 'react-redux';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY; // API Key for OpenWeather API

/**
 * Container used to handle the logic of the API calls to OpenWeatherAPI to return to Weather.js to be displayed.
 * @param {object} - the weather object returned from the API call to OpenWeather API
 * @param {function} setWeather - the function used to set the weather returned from the API call to OpenWeather API
 * @returns 
 */
export default function WeatherContainer({ weather, setWeather }) {
  const setWeatherCallback = useCallback((data) => setWeather(data), [setWeather]);
  const [loading, setLoading] = useState(true);
  const tempUnits = useSelector(selectTempUnits);

  /**
   * Does the calculations to display temperature in Fahrenheit or Celsius
   * @param {object} weather - the weather object returned from the API call to OpenWeather API
   */
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

    return <p className='weather-text'>{tempToDisplay}</p>;
  }

  /**
   * Uses the weather object to determine the icon to be displayed next to the temperature.
   * @param {object} weather - the weather returned from the API call to OpenWeather API
   */
  const weatherIcon = (weather) => {
    if (loading || !weather) {
      return;
    }
    const iconSrc = "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png";
    return <img id="weather-icon" src={iconSrc} alt={weather.weather[0].main} />;
  }

  /**
   * Uses the weather object to determine the description to be displayed next to the temperature.
   * @param {object} weather - the weather returned from the API call to OpenWeather API
   */
 const weatherDescription = (weather) => {
  if (loading || !weather) {
    return;
  }
  let wD = weather.weather[0].description;
  let wDArray = wD.split(" ");
  for (let i=0; i < wDArray.length; i++) {
    let currentString = wDArray[i];
    let newString = currentString[0].toUpperCase() + currentString.substring(1, currentString.length);
    wDArray[i] = newString;
  }
  wD = wDArray.join(" ")
  return <p className='weather-text'>{wD}</p>;
}

  /**
   * API call to OpenWeather API to fetch current weather using user's coordinates.
   */
  useEffect(() => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.cod === 200) {
              setWeatherCallback(data);
            }
            setLoading(false);
          })
      });
    }
    // Update every 15 minutes
    setInterval(() => {
      setLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.cod === 200) {
                setWeatherCallback(data);
              }
              setLoading(false);
            })
        });
      }
    }, 900000);
  }, [setWeatherCallback]); // dependency array left blank, since fetchWeather is being updated using setInterval

  return (
    <>
      {loading ? <div id='weather-loading-text'>Loading Weather...</div> : 
      <Weather weather={weather} weatherIcon={weatherIcon} weatherDescription={weatherDescription} temp={temp} />
      }
    </>
  );
}