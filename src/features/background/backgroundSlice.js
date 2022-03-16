import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const num_of_backgrounds = 15;

/**
 * Grabs the locally stored background index from where the user has left off.
 * If nothing is found, return the first index.
 * @returns {int} the last saved index of the user; otherwise, return first index if not found
 */
const getCurrentIndex = () => {
  const json = localStorage.getItem('currentBackgroundIndex');
  if (json !== null) {
    const currentIndex = JSON.parse(json);
    if (currentIndex >= 0 && currentIndex < num_of_backgrounds) {
      return currentIndex;
    }
  }
  return 0;
}

/**
 * Grabs the locally stored background toggle preference to determine whether
 * or not to show the fetched background.
 * @returns {boolean} the last saved preference of the
 */
const getTogglePreference = () => {
  const json = localStorage.getItem('backgroundToggle');
  if (json !== null) {
    return JSON.parse(json);
  }
  return true;
}

/**
 * Fetches 10 images using [Unsplash](https://unsplash.com) API
 */
export const fetchPictures = createAsyncThunk(
  'background/fetchPictures',
  async () => {
    const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
    let orientation = '&orientation=';
    const items = `&per_page=${num_of_backgrounds}`
    // fetch pictures based on screen orientation
    if (window.screen.width > window.screen.height) {
      orientation += 'landscape';
    } else if (window.screen.width < window.screen.height) {
      orientation += 'portrait';
    } else {
      orientation += 'landscape';
    }
    const pictures = fetch(`https://api.unsplash.com/topics/wallpapers/photos/?client_id=${API_KEY}${orientation}${items}`)
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
    toggle: getTogglePreference(),
  },
  reducers: {
    decrementIndex: (state) => {
      if (state.currentIndex !== 0) {
        state.currentIndex--;
        const json = JSON.stringify(state.currentIndex);
        localStorage.setItem('currentBackgroundIndex', json);
      }
    },
    incrementIndex: (state) => {
      if (state.currentIndex !== state.pictures.length - 1) {
        state.currentIndex++;
        const json = JSON.stringify(state.currentIndex);
        localStorage.setItem('currentBackgroundIndex', json);
      }
    },
    toggleBackground: (state) => {
      state.toggle = !state.toggle;
      const json = JSON.stringify(state.toggle);
      localStorage.setItem('backgroundToggle', json);
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
export const selectBackgroundToggle = (state) => state.background.toggle;
export const { incrementIndex, decrementIndex, toggleBackground } = backgroundSlice.actions;
export default backgroundSlice.reducer;