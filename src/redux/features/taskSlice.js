// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Defining the initial state
const initialState = {
  tasks: {}, // Contains all the tasks
  viewMode: "list",
  taskUpdated: true,
};

// Creating a Redux slice named "tasksSlice"
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Reducer function to add a new task
    addTask: (state, { payload }) => {
      const { user, ...other } = payload;
      if (state.tasks[user]) {
        state.tasks[user] = [other, ...state.tasks[user]];
      } else {
        state.tasks[user] = [other];
      }
    },

    // Reducer function to delete a task
    deleteTask: (state, { payload }) => {
      const { user, id } = payload;
      state.tasks[user] = state.tasks[user].filter((task) => task.id !== id);
    },

    // Reducer function to mark a task as completed
    completeTask: (state, { payload }) => {
      const { user, id } = payload;
      const task = state.tasks[user].find((task) => task.id === id);
      if (task) {
        task.completed = true;
        state.taskUpdated = !state.taskUpdated;
      }
    },

    // Reducer function to change the view mode
    changeViewMode: (state, { payload }) => {
      state.viewMode = payload;
    },
  },
});

// Exporting the action creators
export const { addTask, deleteTask, completeTask, changeViewMode } =
  tasksSlice.actions;

// Exporting the reducer function
export default tasksSlice.reducer;
