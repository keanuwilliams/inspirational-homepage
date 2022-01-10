import React from 'react';
import { 
  selectGoals, 
  removeGoal, 
  completeGoal,
  toggleEdit,
  updateGoal,
} from "./goalsSlice";
import { useSelector, useDispatch } from "react-redux";
import Goal from './Goal';
import './Goals.css';

/**
 * Displays the goals in order by row. Includes two buttons to remove all goals or to complete all goals.
 */
export default function Goals() {
  const goals = useSelector(selectGoals);
  const dispatch = useDispatch();

  return (
    <>
      <section className="goals">
        {Object.values(goals).map((goal) => (
            <Goal 
              key={goal.id} 
              goal={goal} 
              removeGoal={(goal) => dispatch(removeGoal(goal))} 
              completeGoal={(goal) => dispatch(completeGoal(goal))}
              toggleEdit={(goal) => dispatch(toggleEdit(goal))}
              updateGoal={(goalObj) => dispatch(updateGoal(goalObj))}
            />
        ))}
      </section>
    </>
  );
}