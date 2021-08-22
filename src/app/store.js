import { configureStore } from '@reduxjs/toolkit';
import timeReducer from '../features/time/timeSlice';
import goalsReducer from '../features/goals/goalsSlice';
import quoteReducer from '../features/quote/quoteSlice';
import weatherReducer from '../features/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    time: timeReducer,
    goals: goalsReducer,
    quote: quoteReducer,
    weather: weatherReducer
  },
});
