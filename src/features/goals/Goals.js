import React from 'react';
import { selectGoals, removeGoal, completeGoal } from "./goalsSlice";
import { useSelector, useDispatch } from "react-redux";
import Goal from './Goal';

export default function Goals() {
  const goals = useSelector(selectGoals);
  const dispatch = useDispatch();

  const finishGoal = (goal) => {
    dispatch(completeGoal(goal));
  }

  const deleteGoal = (goal) => {
    dispatch(removeGoal(goal));
  }

  return (
    <section>
      {Object.values(goals).map((goal, index) => (
        <Goal key={index} goal={goal} removeGoal={deleteGoal} completeGoal={finishGoal} />
      ))}
    </section>
  );
}