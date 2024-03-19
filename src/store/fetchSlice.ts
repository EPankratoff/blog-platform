import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CardData } from '../Types/CardTyps';

type Cards = CardData[];

const baseUrl = 'https://blog.kata.academy/api';

export type FetchSliceState = {
  error: string | null;
  loading: boolean;
  articles: Cards;
  articlesCount: number;
  currentArticle: CardData | null;
};

const initialState: FetchSliceState = {
  loading: false,
  error: null,
  articles: [],
  articlesCount: 0,
  currentArticle: null,
};

export const fetchCards = createAsyncThunk<
  FetchSliceState,
  { offset: number },
  { rejectValue: string }
>('fetch/fetchCards', async ({ offset }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUrl}/articles?limit=5&offset=${offset}`);
    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    return rejectWithValue(`Error: ${(error as Error).message}`);
  }
});

export const fetchCard = createAsyncThunk<CardData, { slug: string }, { rejectValue: string }>(
  'fetch/fetchCard',
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/articles/${args.slug}`);
      if (!response.ok) {
        throw new Error(`Неудалось получить slug ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(`Error: ${(error as Error).message}`);
    }
  }
);

const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : 'Unknown error';
      })
      .addCase(fetchCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArticle = action.payload;
      })
      .addCase(fetchCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : 'Unknown error';
      });
  },
});

export default fetchSlice.reducer;
