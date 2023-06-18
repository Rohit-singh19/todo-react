import "./App.css";
import React from "react";
import LoginPage from "./Pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import AuthProtectedRoutes from "./Routes/AuthProtected";
import TaskListPage from "./Pages/TaskListPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AuthProtectedRoutes />}>
        <Route index element={<TaskListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
