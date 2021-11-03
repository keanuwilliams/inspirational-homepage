import { createSlice } from "@reduxjs/toolkit";

/**
 * Retrieves locally stored user preferences. If none exist, return default.
 */
const getTempUnits = () => {
  const json = localStorage.getItem('tempUnits');
  if (json !== null) {
    return JSON.parse(json);
  } else {
    return 'F';
  }
}

/**
 * Handles user's temperature unit preferences.
 */
export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    tempUnits: getTempUnits(),
  },
  reducers: {
    toggleTempUnits: (state) => {
      if (state.tempUnits === 'F') {
        state.tempUnits = 'C';
      } else {
        state.tempUnits = 'F';
      }
      const json = JSON.stringify(state.tempUnits);
      localStorage.setItem('tempUnits', json);
    }
  }
});

// Exports
export const selectTempUnits = (state) => state.weather.tempUnits;
export const { toggleTempUnits } = weatherSlice.actions;
export default weatherSlice.reducer;