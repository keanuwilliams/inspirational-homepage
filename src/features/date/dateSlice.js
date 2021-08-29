import { createSlice } from '@reduxjs/toolkit';

const getFullMonth = (month) => {
  let fullMonth = 'Unknown';
  switch (month) {
    case 1:
      fullMonth = 'January';
      break;
    case 2:
      fullMonth = 'February';
      break;
    case 3:
      fullMonth = 'March';
      break;
    case 4:
      fullMonth = 'April';
      break;
    case 5:
      fullMonth = 'May';
      break;
    case 6:
      fullMonth = 'June';
      break;
    case 7:
      fullMonth = 'July';
      break;
    case 8:
      fullMonth = 'August';
      break;
    case 9:
      fullMonth = 'September';
      break;
    case 10:
      fullMonth = 'October';
      break;
    case 11:
      fullMonth = 'November';
      break;
    case 12:
      fullMonth = 'December';
      break;
    default:
      month = 'Unknown';
  }
  return fullMonth;
}

export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    value: ''
  },
  reducers: {
    updateDate: (state) => {
      const date = new Date();
      const [month, day, year] = [date.getMonth()+1, date.getDate(), date.getFullYear()];
      if (document.body.clientWidth > document.body.clientHeight) {
        const fullMonth = getFullMonth(month);
        state.value = `${fullMonth} ${day}, ${year}`;
      } else {
        state.value = `${month}/${day}/${year}`;
      }
    }
  }
});

export const selectDate = (state) => state.date.value;
export const { updateDate } = dateSlice.actions;
export default dateSlice.reducer;