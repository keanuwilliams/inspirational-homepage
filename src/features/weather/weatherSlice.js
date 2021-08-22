import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    tempUnits: 'F'
  },
  reducers: {
    toggleTempUnits: (state) => {
      if (state.tempUnits === 'F') {
        state.tempUnits = 'C';
      } else {
        state.tempUnits = 'F';
      }
    }
  }
});

export const selectTempUnits = (state) => state.weather.tempUnits;
export const { toggleTempUnits } = weatherSlice.actions;
export default weatherSlice.reducer;