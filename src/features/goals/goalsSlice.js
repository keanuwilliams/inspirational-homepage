import { createSlice } from '@reduxjs/toolkit';

export const goalsSlice = createSlice({
  name: 'goals',
  initialState: {
    goals: [],
  },
  reducers: {
    addGoal: (state, action) => {
      state.goals.push(action.payload);
    },
    removeGoal: (state, action) => {
      state.goals = state.goals.filter((goal) => goal.id !== action.payload.id);
    },
    completeGoal: (state, action) => {
      const goal = state.goals.find((goal) => goal.id === action.payload.id);
      goal.complete = !goal.complete;
    },
    toggleEdit: (state, action) => {
      const goal = state.goals.find((goal) => goal.id === action.payload.id);
      goal.edit = !goal.edit;
    },
    updateGoal: (state, action) => {
      const goal = state.goals.find((goal) => goal.id === action.payload.goalId);
      goal.name = action.payload.newName;
    }
  }
});

export const { addGoal, removeGoal, completeGoal, toggleEdit, updateGoal } = goalsSlice.actions;
export const selectGoals = (state) => state.goals.goals;
export default goalsSlice.reducer;