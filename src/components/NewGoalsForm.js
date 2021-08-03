import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGoal } from '../features/goals/goalsSlice';

export default function NewGoalsForm() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    dispatch(
      addGoal({
        name: name
      })
    );

    setName("");
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input 
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="What's on your mind?"
        />
      </form>
    </section>
  );

}