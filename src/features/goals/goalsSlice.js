import { createSlice } from '@reduxjs/toolkit';

/** 
 * Function to initialize goals depending if there are goals saved to local storage.
 * If no goals exist, return an empty list.
 */
const setInitialState = () => {
  const json = localStorage.getItem('goals');
  if (json !== null) {
    const savedGoals = JSON.parse(json);
    return {
      goals: savedGoals,
    };
  } else {
    return {
      goals: [],
    };
  }
}

/**
 * Slice that handles the goal list and the functions that add to, remove from,  
 * complete, and update the goals in the goal list.
 */
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
    },
    removeAllGoals: (state) => {
      let answer = window.confirm("Are you sure you want to remove all your goals?");
      if (answer) {
        state.goals = [];
        const json = JSON.stringify(state.goals);
        localStorage.setItem('goals', json);
      }
    },
    comepleteAllGoals: (state) => {
      let answer = window.confirm("Are you sure you want to mark all of your goals as complete?");
      if (answer) {
        state.goals.forEach((goal) => goal.complete = true);
        const json = JSON.stringify(state.goals);
        localStorage.setItem('goals', json);
      }
    }
  }
});


// Exports
export const { 
  addGoal, 
  removeGoal, 
  completeGoal, 
  toggleEdit, 
  updateGoal,
  removeAllGoals,
  comepleteAllGoals
} = goalsSlice.actions;

export const selectGoals = (state) => state.goals.goals;
export default goalsSlice.reducer;