import { configureStore } from '@reduxjs/toolkit';
import timeReducer from '../features/time/timeSlice';
import goalsReducer from '../features/goals/goalsSlice';

export const store = configureStore({
  reducer: {
    time: timeReducer,
    goals: goalsReducer,
  },
});
