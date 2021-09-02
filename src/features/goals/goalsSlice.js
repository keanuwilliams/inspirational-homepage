import { createSlice } from '@reduxjs/toolkit';

/** Function to initialize goals depending if there are goals saved to local storage */
const setInitialState = () => {
  const json = localStorage.getItem('goals');
  if (json !== null) {
    return {
      goals: JSON.parse(json),
    }
  } else {
    return {
      goals: [],
    };
  }
}

export const goalsSlice = createSlice({
  name: 'goals',
  initialState: setInitialState(),
  reducers: {
    addGoal: (state, action) => {
      state.goals.push(action.payload);
      const json = JSON.stringify(state.goals);
      localStorage.setItem('goals', json);
    },
    removeGoal: (state, action) => {
      state.goals = state.goals.filter((goal) => goal.id !== action.payload.id);
      const json = JSON.stringify(state.goals);
      localStorage.setItem('goals', json);
    },
    completeGoal: (state, action) => {
      const goal = state.goals.find((goal) => goal.id === action.payload.id);
      goal.complete = !goal.complete;
      const json = JSON.stringify(state.goals);
      localStorage.setItem('goals', json);
    },
    toggleEdit: (state, action) => {
      const goal = state.goals.find((goal) => goal.id === action.payload.id);
      goal.edit = !goal.edit;
      const json = JSON.stringify(state.goals);
      localStorage.setItem('goals', json);
    },
    updateGoal: (state, action) => {
      const goal = state.goals.find((goal) => goal.id === action.payload.goalId);
      goal.name = action.payload.newName;
      const json = JSON.stringify(state.goals);
      localStorage.setItem('goals', json);
    }
  }
});

export const { addGoal, removeGoal, completeGoal, toggleEdit, updateGoal } = goalsSlice.actions;
export const selectGoals = (state) => state.goals.goals;
export default goalsSlice.reducer;