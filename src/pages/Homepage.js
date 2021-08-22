import React from 'react';
import Time from '../features/time/Time';
import Goals from '../features/goals/Goals';
import Quote from '../features/quote/Quote';
import WeatherContainer from '../features/weather/WeatherContainer';
import Settings from '../features/settings/Settings';
import NewGoalsForm from '../components/NewGoalsForm';
import '../App.css';

export default function Homepage() {
  return (
    <>
      <Settings />
      <div className="info-container">
        <Time />
        <WeatherContainer />
      </div>
      <div className="goal-container">
        <NewGoalsForm />
        <Goals />
      </div>
      <Quote />
    </>
  );
}