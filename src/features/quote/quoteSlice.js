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
 * Gets a random index given the length of the array of quotes.
 * @returns {number} a random index
 */
const getRandomIndex = (allQuotes) => {
    return Math.floor(Math.random() * allQuotes.length);
}

/**
 * Gets a single quote from the array of quotes.
 * @returns {object} a single object in the same format as quotes array
 */

const getSingleQuote = (allQuotes) => {
    let index = getRandomIndex(allQuotes);
    let quote = allQuotes[index].text;

    while (quote.length > MAX_QUOTE_LENGTH) {
      index = getRandomIndex(allQuotes);
      quote = allQuotes[index].text;
    }

    let author = allQuotes[index].author;

    if (!author || author === 'type.fit') {
      author = 'Anonymous';
    } else if (author.includes('type.fit')) {
      author = author.split(',')[0];
    }

    return {
      'author': author,
      'text': quote
    };
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
      const quote = getSingleQuote(state.allQuotes);
      state.quote = quote.text;
      state.author = quote.author;
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
      const quote = getSingleQuote(state.allQuotes);
      state.quote = quote.text;
      state.author = quote.author;
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
