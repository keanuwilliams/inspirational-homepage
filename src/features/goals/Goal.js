import React from 'react';
import Button from '../../components/Button';
import './Goals.css';

export default function Goal({ goal, removeGoal, completeGoal }) {

  return (
    <div className={goal.complete ? "goal goal-complete" : "goal"}>
      <div id="goal-text">
        {goal.complete ? <p style={{ textDecoration: "line-through" }}>{goal.name}</p> : <p>{goal.name}</p>}  
      </div>
      <div className="goal-btn-group">
        {
          !goal.complete ? <Button success contents="Done" onClick={(e) => completeGoal(goal)} /> : 
          <Button secondary contents="Undo" onClick={(e) => completeGoal(goal)} />
        }
        <Button danger contents="Remove" onClick={(e) => removeGoal(goal)} />
      </div>
    </div>
  );
}