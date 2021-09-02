import { createSlice } from "@reduxjs/toolkit";
import { getDefaultNormalizer } from "@testing-library/react";

// Creates a time string depending on the one boolean parameter: militaryTime
const getTimeString = (militaryTime) => {
  // Grab the hours and minutes to create the time string
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Create the time string
  let timeString = "";
  let AMPM = "";
  if (!militaryTime) {
    if (hours > 12) {
      hours -= 12;
      AMPM = "PM"
    } else {
      if (hours === 0) {
        hours += 12;
      }
      AMPM = "AM"
    }
  }
  // Add a leading zero if hours and minutes are one digit
  hours = hours < 10 ? `0${hours}` : `${hours}`;
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  timeString = `${hours}:${minutes}`;
  if (!militaryTime) {
    timeString += AMPM;
  }
  return timeString;
}

const getTimePreference = () => {
  const json = localStorage.getItem('timePreference');
  if (json !== null) {
    return JSON.parse(json);
  } else {
    return false;
  }
}

export const timeSlice = createSlice({
  name: 'time',
  initialState: {
    value: getTimeString(false),
    militaryTime: getTimePreference(),
  },
  reducers: {
    toggleTime: (state) => {
      state.militaryTime = !state.militaryTime;
      const json = JSON.stringify(state.militaryTime);
      localStorage.setItem('timePreference', json);
    },
    updateTime: (state) => {
      state.value = getTimeString(state.militaryTime);
    }
  }
});

export const selectMilitaryTime = (state) => state.time.militaryTime;
export const selectTime = (state) => state.time.value;
export const { toggleTime, updateTime } = timeSlice.actions;
export default timeSlice.reducer;