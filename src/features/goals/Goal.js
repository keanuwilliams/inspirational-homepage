import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import './Goals.css';

export default function Goal({ goal, removeGoal, completeGoal, toggleEdit, updateGoal }) {
  const [name, setName] = useState(goal.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === goal.name || name === '') {
      setName(goal.name);
      toggleEdit(goal);
      return;
    }

    updateGoal({
      goalId: goal.id,
      newName: name
    });

    toggleEdit(goal);
  }

  // Goal Name text to be displayed. If the goal is in edit mode, a form will appear. If the goal is
  // completed, the goal name will be displayed with a line through it. Lastly, the default is just the
  // goal name displayed.
  const GoalName = () => {
    if (goal.complete) {
      return <p id="goal-text" style={{ textDecoration: "line-through" }}>{goal.name}</p>;
    } 
    return <p id="goal-text">{goal.name}</p>;
  }

  // The Goal Buttons to be displayed. If the goal is in edit mode, two buttons will appear to handle
  // the form. Otherwise, the goal will display the default buttons: Done and Remove. If the Done button
  // is pressed, it will change to an Undo button so that you will be able to undo completing the goal.
  const GoalBtns = () => {
    if (goal.edit) {
      return (
        <>
          <Button contents="Submit" onClick={handleSubmit}/>
          <Button secondary contents="Cancel" onClick={() => {
            setName(goal.name);
            toggleEdit(goal);
          }} />
        </>
      );
    }
    return (
      <>
        {
          !goal.complete ? <Button success contents="Done" onClick={() => completeGoal(goal)} /> : 
          <Button secondary contents="Undo" onClick={() => completeGoal(goal)} />
        }
        <Button danger contents="Remove" onClick={() => removeGoal(goal)} />
      </>
    );
  }

  return (
    <div className={goal.complete ? "goal goal-complete" : "goal"}>
      {!goal.edit && 
      (
        <button onClick={() => toggleEdit(goal)} id='goal-edit-icon'>
          <FontAwesomeIcon icon={faPen} />
        </button>
      )}
      <div>
        {goal.edit ? (
          <form onSubmit={handleSubmit}>
            <div id="goal-edit-form">
              <input 
                required
                type="text"
                value={name} 
                onChange={(e) => setName(e.currentTarget.value)} 
              />
            </div>
          </form>
        ) : (
          <GoalName />
        )}
      </div>
      <div className="goal-btn-group">
        <GoalBtns />
      </div>
    </div>
  );
}