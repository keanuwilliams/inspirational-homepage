import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from 'react-redux';
import { addGoal } from '../features/goals/goalsSlice';
import "../App.css";

export default function NewGoalsForm() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    const goalId = uuidv4();

    dispatch(
      addGoal({
        id: goalId,
        name: name,
        complete: false,
        edit: false,
      })
    );

    setName("");
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
            <label>What's on your mind?</label>
        </div>
      </form>
    </div>   
  );

}