import React from 'react';
import { 
  selectGoals, 
  removeGoal, 
  completeGoal,
  toggleEdit,
  updateGoal
} from "./goalsSlice";
import { useSelector, useDispatch } from "react-redux";
import Goal from './Goal';
import './Goals.css';

export default function Goals() {
  const goals = useSelector(selectGoals);
  const dispatch = useDispatch();

  return (
    <section className="goals">
      {Object.values(goals).map((goal, index) => (
          <Goal 
            key={index} 
            goal={goal} 
            removeGoal={(goal) => dispatch(removeGoal(goal))} 
            completeGoal={(goal) => dispatch(completeGoal(goal))}
            toggleEdit={(goal) => dispatch(toggleEdit(goal))}
            updateGoal={(goalObj) => dispatch(updateGoal(goalObj))}
          />
      ))}
    </section>
  );
}