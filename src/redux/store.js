/*
  This file deals with the configuration of the Redux store and the persistence of state using redux-persist.
*/

// Importing necessary dependencies
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";

// Importing the authSlice and taskSlice reducers
import authSlice from "./features/authSlice";
import taskSlice from "./features/taskSlice";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combining the authSlice and taskSlice reducers
const reducer = combineReducers({
  authReducer: authSlice,
  taskReducer: taskSlice,
});

// Creating a persisted reducer with redux-persist
const persistedReducer = persistReducer(persistConfig, reducer);

// Configuring the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Creating a persistor for redux-persist
export const persistor = persistStore(store);
