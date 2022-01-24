import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * Grabs the locally stored background index from where the user has left off.
 * If nothing is found, return the first index.
 * @returns {int} the last saved index of the user; otherwise, return first index if not found
 */
const getCurrentIndex = () => {
  const json = localStorage.getItem('currentBGIndex');
  if (json !== null) {
    const currentIndex = JSON.parse(json);
    if (currentIndex >= 0 && currentIndex < 10) {
      return currentIndex;
    }
  }
  return 0;
}

/**
 * Fetches 10 images using [Unsplash](https://unsplash.com) API
 */
export const fetchPictures = createAsyncThunk(
  'background/fetchPictures',
  async () => {
    const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
    let orientation = '&orientation=';
    // fetch pictures based on screen orientation
    if (window.screen.width > window.screen.height) {
      orientation += 'landscape';
    } else if (window.screen.width < window.screen.height) {
      orientation += 'portrait';
    } else {
      orientation += 'squarish';
    }
    const pictures = fetch(`https://api.unsplash.com/topics/wallpapers/photos/?client_id=${API_KEY}${orientation}`)
    .then((response) => response.json());
    return pictures;
  }
);

/**
 * The almighty Background Slice handling all of the storing and fetching of picture URLS and incrementing
 * and decrementing of the indices.
 */
export const backgroundSlice = createSlice({
  name: 'background',
  initialState: {
    status: 'idle',
    pictures: [],
    currentIndex: getCurrentIndex(),
  },
  reducers: {
    decrementIndex: (state) => {
      if (state.currentIndex !== 0) {
        state.currentIndex--;
        const json = JSON.stringify(state.currentIndex);
        localStorage.setItem('currentBGIndex', json);
      }
    },
    incrementIndex: (state) => {
      if (state.currentIndex !== state.pictures.length - 1) {
        state.currentIndex++;
        const json = JSON.stringify(state.currentIndex);
        localStorage.setItem('currentBGIndex', json);
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

// Exports
export const selectCurrentIndex = (state) => state.background.currentIndex;
export const selectPictures = (state) => state.background.pictures;
export const selectStatus = (state) => state.background.status;
export const { incrementIndex, decrementIndex } = backgroundSlice.actions;
export default backgroundSlice.reducer;