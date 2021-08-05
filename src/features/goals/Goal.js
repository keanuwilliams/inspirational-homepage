import React from 'react';
import Button from '../../components/Button';

export default function Goal({ goal, removeGoal, completeGoal }) {

  return (
    <>
      {goal.complete ? <p style={{ textDecoration: "line-through" }}>{goal.name}</p> : <p>{goal.name}</p>}
      {!goal.complete && <Button success contents="Done" onClick={(e) => completeGoal(goal)} />}
      <Button danger contents="Remove" onClick={(e) => removeGoal(goal)} />
    </>
  );
}