import React from 'react';
import { selectGoals } from "./goalsSlice";
import { useSelector } from "react-redux";
import Goal from './Goal';

export default function Goals() {
  const goals = useSelector(selectGoals);

  return (
    <section>
      {Object.values(goals).map((goal, index) => (
        <Goal key={index} goal={goal} />
      ))}
    </section>
  );
}