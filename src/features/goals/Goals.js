import React from 'react';
import { 
  selectGoals, 
  selectAllBtns,
  removeGoal, 
  completeGoal,
  toggleEdit,
  updateGoal,
  comepleteAllGoals,
  removeAllGoals
} from "./goalsSlice";
import { useSelector, useDispatch } from "react-redux";
import Goal from './Goal';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import './Goals.css';

/**
 * Displays the goals in order by row. Includes two buttons to remove all goals or to complete all goals.
 */
export default function Goals() {
  const goals = useSelector(selectGoals);
  const allBtns = useSelector(selectAllBtns);
  const dispatch = useDispatch();

  const checkmarkIcon = <FontAwesomeIcon icon={faCheck} />;
  const banIcon = <FontAwesomeIcon icon={faBan} />;

  return (
    <>
      {allBtns && 
        <div className="goal-all-btns">
          {goals.length !== 0 && <Button success contents={checkmarkIcon} onClick={() => dispatch(comepleteAllGoals())} />}
          {goals.length !== 0 && <Button danger contents={banIcon} onClick={() => dispatch(removeAllGoals())}/>}
        </div> 
      }
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