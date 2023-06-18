import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: {}, // Contains all the tasks
  viewMode: "list",
  taskUpdated: true,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      const { user, ...other } = payload;
      if (state.tasks[user]) {
        state.tasks[user] = [other, ...state.tasks[user]];
      } else {
        state.tasks[user] = [other];
      }
    },
    deleteTask: (state, { payload }) => {
      const { user, id } = payload;
      state.tasks[user] = state.tasks[user].filter((task) => task.id !== id);
    },
    completeTask: (state, { payload }) => {
      const { user, id } = payload;
      const task = state.tasks[user].find((task) => task.id === id);
      if (task) {
        task.completed = true;
        state.taskUpdated = !state.taskUpdated;
      }
    },
    changeViewMode: (state, { payload }) => {
      state.viewMode = payload;
    },
  },
});

export const { addTask, deleteTask, completeTask, changeViewMode } =
  tasksSlice.actions;
export default tasksSlice.reducer;
