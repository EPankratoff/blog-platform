import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CardData } from "../Component/CardList/Card/Card";

type Cards = CardData[];

const baseUrl = 'https://blog.kata.academy/api';

export type FetchSliceState = {
    error: string | null;
    loading: boolean;
    articles: Cards;
    articlesCount: number;
};

const initialState: FetchSliceState = {
    loading: false,
    error: null,
    articles: [],
    articlesCount: 0
};

export const fetchCard = createAsyncThunk<
    { articles: Cards },
    { offset: number },
    { rejectValue: string }
>(
    'fetch/fetchCard',
    async ({ offset }, { rejectWithValue }) => {
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
    }
);

const fetchSlice = createSlice({
    name: 'fetch',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCard.fulfilled, (state, action) => {
                state.articles = action.payload.articles;
                state.articlesCount = action.payload.articles.length;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchCard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload : 'Unknown error';
            });
    }
});

export default fetchSlice.reducer;
