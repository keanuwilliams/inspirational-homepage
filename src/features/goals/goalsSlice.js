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
      state.goals.map((goal) => goal !== action.payload);
    },
    completeGoal: (state, action) => {
      // complete after creating Goal, Goals, and Goal Form
    }
  }
});

export const { addGoal, removeGoal, completeGoal } = goalsSlice.actions;
export const selectGoals = (state) => state.goals.goals;
export default goalsSlice.reducer;