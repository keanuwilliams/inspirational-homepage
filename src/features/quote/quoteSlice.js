import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const MAX_QUOTE_LENGTH = 100;

/**
 * Grabs the locally stored quotes toggle preference to determine whether
 * or not to show the fetched quotes.
 * @returns {boolean} the last saved preference of the
 */
 const getTogglePreference = () => {
  const json = localStorage.getItem('quoteToggle');
  if (json !== null) {
    return JSON.parse(json);
  }
  return true;
}

/**
 * Fetches the quotes from the type.fit API
 */
export const fetchQuotes = createAsyncThunk(
  'quote/fetchQuotes',
  async () => {
    const quotes = fetch('https://type.fit/api/quotes')
      .then((response) => response.json());
    return quotes;
  }
);

/**
 * Handles fetching all of the quotes from the API and grabbing a random one to display.
 */
export const quoteSlice = createSlice({
  name: 'quote',
  initialState: {
    quote: '',
    allQuotes: [],
    author: '',
    status: 'idle',
    toggle: getTogglePreference(),
  },
  reducers: {
    generateQuote: (state) => {
      if (state.allQuotes.length > 0) {
        let index = Math.floor(Math.random() * state.allQuotes.length);
        state.quote = state.allQuotes[index].text;
        while (state.quote.length > MAX_QUOTE_LENGTH) {
          index = Math.floor(Math.random() * state.allQuotes.length);
          state.quote = state.allQuotes[index].text;
        }
        state.author = state.allQuotes[index].author;
        if (state.author === null) {
          state.author = "Anonymous";
        }
      }
    },
    toggleQuote: (state) => {
      state.toggle = !state.toggle;
      const json = JSON.stringify(state.toggle);
      localStorage.setItem('quoteToggle', json);
    }
  },
  extraReducers: {
    [fetchQuotes.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchQuotes.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.allQuotes = action.payload;
      let index = Math.floor(Math.random() * state.allQuotes.length);
      state.quote = action.payload[index].text;
      while (state.quote.length > MAX_QUOTE_LENGTH) {
        index = Math.floor(Math.random() * state.allQuotes.length);
        state.quote = action.payload[index].text;
      }
      state.author = action.payload[index].author;
      if (state.author === null) {
        state.author = "Anonymous";
      }
    },
    [fetchQuotes.rejected]: (state) => {
      state.status = 'failed';
    }
  }
});

// Exports
export const selectQuote = (state) => state.quote.quote;
export const selectAuthor = (state) => state.quote.author;
export const selectStatus = (state) => state.quote.status;
export const selectQuoteToggle = (state) => state.quote.toggle;
export const { generateQuote, toggleQuote } = quoteSlice.actions;
export default quoteSlice.reducer;
