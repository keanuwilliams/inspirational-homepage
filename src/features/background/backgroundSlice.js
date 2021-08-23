import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPictures = createAsyncThunk(
  'background/fetchPictures',
  async () => {
    const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
    const pictures = fetch(`https://api.unsplash.com/photos/?client_id=${API_KEY}`)
      .then((response) => response.json());
    return pictures;
  }
);

export const backgroundSlice = createSlice({
  name: 'background',
  initialState: {
    status: 'idle',
    pictures: [],
    currentIndex: 0,
  },
  reducers: {
    decrementIndex: (state) => {
      if (state.currentIndex !== 0) {
        state.currentIndex--;
      }
    },
    incrementIndex: (state) => {
      if (state.currentIndex !== state.pictures.length - 1) {
        state.currentIndex++;
      }
    }
  },
  extraReducers: {
    [fetchPictures.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPictures.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.pictures = action.payload;
    },
    [fetchPictures.rejected]: (state) => {
      state.status = 'failed';
    }
  }
});

export const selectCurrentIndex = (state) => state.background.currentIndex;
export const selectPictures = (state) => state.background.pictures;
export const selectStatus = (state) => state.background.status;
export const { incrementIndex, decrementIndex } = backgroundSlice.actions;
export default backgroundSlice.reducer;