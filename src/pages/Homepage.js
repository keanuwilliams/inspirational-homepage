import React from 'react';
import Time from '../features/time/Time';
import Goals from '../features/goals/Goals';
import Quote from '../features/quote/Quote';
import NewGoalsForm from '../components/NewGoalsForm';
import '../App.css';

export default function Homepage() {
  return (
    <>
      <Time />
      <Quote />
      <div className="goal-container">
        <NewGoalsForm />
        <Goals />
      </div>
    </>
  );
}