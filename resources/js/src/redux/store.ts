import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./auth/authSlice";
import themeConfigSlice from "../store/themeConfigSlice";

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    themeConfig: themeConfigSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: false,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type IRootState = ReturnType<typeof rootReducer>;