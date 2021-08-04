import React from 'react';
import Time from '../features/time/Time';
import Goals from '../features/goals/Goals';
import NewGoalsForm from '../components/NewGoalsForm';
import '../App.css';

export default function Homepage() {
  return(
    <>
      <div className="time"><Time /></div>
      <NewGoalsForm />
      <Goals />
    </>
  );
}