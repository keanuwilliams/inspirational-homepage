import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from 'react-redux';
import { addGoal } from '../features/goals/goalsSlice';
import "../App.css";

/**
 * The input field handling all of the new goals being added to the list of goals.
 */
export default function NewGoalsForm() {
  const [name, setName] = useState(""); 
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) { // if the goal does not have a name, do not add to list when enter key is pressed
      return;
    }

    const goalId = uuidv4(); // create a unique id using UUID random

    dispatch(
      addGoal({
        id: goalId,
        name: name,
        complete: false,
        edit: false,
      })
    );

    setName(""); // reset the input field after submitting
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
            <input
              required
              className="input-text"
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <label>What are your goals today?</label>
        </div>
      </form>
    </div>   
  );

}