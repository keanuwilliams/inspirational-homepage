import { configureStore } from '@reduxjs/toolkit';
import timeReducer from '../features/time/timeSlice';
import quoteReducer from '../features/quote/quoteSlice';
import weatherReducer from '../features/weather/weatherSlice';
import backgroundReducer from '../features/background/backgroundSlice';
import dateReducer from '../features/date/dateSlice';

export const store = configureStore({
  reducer: {
    time: timeReducer,
    quote: quoteReducer,
    weather: weatherReducer,
    background: backgroundReducer,
    date: dateReducer,
  },
});
