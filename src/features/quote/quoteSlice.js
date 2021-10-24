import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
  },
  reducers: {
    generateQuote: (state) => {
      if (state.allQuotes.length > 0) {
        const index = Math.floor(Math.random() * state.allQuotes.length);
        state.quote = state.allQuotes[index].text;
        state.author = state.allQuotes[index].author;
        if (state.author === null) {
          state.author = "Anonymous";
        }
      }
    }
  },
  extraReducers: {
    [fetchQuotes.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchQuotes.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.allQuotes = action.payload;
      const index = Math.floor(Math.random() * state.allQuotes.length);
      state.quote = action.payload[index].text;
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
export const { generateQuote } = quoteSlice.actions;
export default quoteSlice.reducer;
