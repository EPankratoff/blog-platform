import { configureStore } from "@reduxjs/toolkit";

import fetchSlice from "./fetchSlice";



const store = configureStore({
    reducer: {
        fetchReducer: fetchSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch