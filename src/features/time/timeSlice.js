import { createSlice } from "@reduxjs/toolkit";

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

export const timeSlice = createSlice({
  name: 'time',
  initialState: {
    value: getTimeString(false),
    militaryTime: false
  },
  reducers: {
    toggleTime: (state) => {
      state.militaryTime = !state.militaryTime;
    },
    updateTime: (state) => {
      state.value = getTimeString(state.militaryTime);
    }
  }
});

export const selectTime = (state) => state.time.value;
export const { toggleTime, updateTime } = timeSlice.actions;
export default timeSlice.reducer;