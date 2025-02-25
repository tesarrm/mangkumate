import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    token: string;
    user: string;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: "",
    user: "",
    isLoading: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            state.error = null; // Reset error on successful registration
        },
        userLoggedIn: (state, action: PayloadAction<{ accessToken: string, user: string }>) => {
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
            state.isLoading = false;
            state.error = null; // Reset error on successful login
        },
        userLoggedOut: (state) => {
            state.token = "";
            state.user = "";
            state.isLoading = false;
            state.error = null;
        },
        setAuthLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setAuthError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
})

export const { 
    userRegistration, 
    userLoggedIn, 
    userLoggedOut, 
    setAuthLoading, 
    setAuthError 
} = authSlice.actions;

export default authSlice.reducer;
