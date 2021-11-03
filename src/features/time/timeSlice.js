import { createSlice } from "@reduxjs/toolkit";

// Creates a time string depending on the one boolean parameter: militaryTime
const getTimeString = (militaryTime = false, secondsPreference = false) => {
  // Grab the hours and minutes to create the time string
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Create the time string
  let timeString = "";
  let AMPM = "";
  if (!militaryTime) {
    if (hours > 12) {
      hours -= 12;
      AMPM = "PM";
    } else if (hours === 12) {
      AMPM = "PM";
    } else {
      if (hours === 0) {
        hours += 12;
      }
      AMPM = "AM";
    }
  }
  // Add a leading zero if hours, minutes, or seconds are one digit
  hours = hours < 10 ? `0${hours}` : `${hours}`;
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  // Check if user prefers the seconds added
  timeString = secondsPreference ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
  if (!militaryTime) {
    timeString += AMPM;
  }
  return timeString;
}

// Retrieves locally stored user preferences. If none exist, return default.
const getInitialState = () => {
  const jsonMilitary = localStorage.getItem('timeMilitary');
  const jsonSeconds = localStorage.getItem('timeSeconds');
  let initialState = {
    militaryTime: false,
    secondsPreference: false,
    value: ''
  };

  // Check if military time exists locally, and if it does get the data
  if (jsonMilitary !== null) {
    initialState.militaryTime = JSON.parse(jsonMilitary);
  }

  // Check if seconds preference exists locally, and if it does get the data
  if (jsonSeconds !== null) {
    initialState.secondsPreference = JSON.parse(jsonSeconds);
  }

  initialState.value = getTimeString(initialState.militaryTime, initialState.secondsPreference);

  return initialState;
}

/**
 * Handles fetching current time and formatting based upon user's preferences.
 */
export const timeSlice = createSlice({
  name: 'time',
  initialState: getInitialState(),
  reducers: {
    toggleTime: (state) => {
      state.militaryTime = !state.militaryTime;
      const json = JSON.stringify(state.militaryTime);
      localStorage.setItem('timeMilitary', json);
    },
    toggleSeconds: (state) => {
      state.secondsPreference = !state.secondsPreference;
      const json = JSON.stringify(state.secondsPreference);
      localStorage.setItem('timeSeconds', json);
    },
    updateTime: (state) => {
      state.value = getTimeString(state.militaryTime, state.secondsPreference);
    }
  }
});

// Exports
export const selectMilitaryTime = (state) => state.time.militaryTime;
export const selectTime = (state) => state.time.value;
export const selectSecondsPreference = (state) => state.time.secondsPreference;
export const { toggleTime, updateTime, toggleSeconds } = timeSlice.actions;
export default timeSlice.reducer;