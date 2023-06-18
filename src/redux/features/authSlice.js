// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Defining the initial state
const initialState = {
  user: null,
  isLoggedIn: false,
};

// Creating a Redux slice named "authSlice"
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer function to handle user login
    login: (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
    },

    // Reducer function to handle user logout
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

// Exporting the action creators
export const { login, logout } = authSlice.actions;

// Exporting the reducer function
export default authSlice.reducer;
