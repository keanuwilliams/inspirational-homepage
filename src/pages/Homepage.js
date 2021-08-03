import React from 'react';
import Time from '../features/time/Time';
import Goals from '../features/goals/Goals';
import NewGoalsForm from '../components/NewGoalsForm';

export default function Homepage() {
  return(
    <div>
      <Time />
      <NewGoalsForm />
      <Goals />
    </div>
  );
}