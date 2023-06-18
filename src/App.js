import "./App.css";
import React from "react";
import LoginPage from "./Pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import AuthProtectedRoutes from "./Routes/AuthProtected";
import TaskListPage from "./Pages/TaskListPage";
import { useSelector } from "react-redux";

function App() {
  // const all = useSelector((state) => state);

  // console.log("all:::", all);

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
