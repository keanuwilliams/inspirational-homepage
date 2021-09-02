import { createSlice } from "@reduxjs/toolkit";

const getTempUnits = () => {
  const json = localStorage.getItem('tempUnits');
  if (json !== null) {
    return JSON.parse(json);
  } else {
    return 'F';
  }
}

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

export const selectTempUnits = (state) => state.weather.tempUnits;
export const { toggleTempUnits } = weatherSlice.actions;
export default weatherSlice.reducer;