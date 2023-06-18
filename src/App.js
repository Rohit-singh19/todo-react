import "./App.css"; // Importing the CSS file for the App component
import React from "react"; // Importing React to use React components
import LoginPage from "./Pages/LoginPage"; // Importing the LoginPage component
import { Route, Routes } from "react-router-dom"; // Importing Route and Routes components from react-router-dom
import AuthProtectedRoutes from "./Routes/AuthProtected"; // Importing AuthProtectedRoutes component
import TaskListPage from "./Pages/TaskListPage"; // Importing the TaskListPage component

function App() {
  return (
    <Routes>
      {" "}
      {/* Creating a routing configuration using the Routes component */}
      <Route path="/login" element={<LoginPage />} />{" "}
      {/* Route for the "/login" path, rendering the LoginPage component */}
      <Route element={<AuthProtectedRoutes />}>
        {" "}
        {/* Parent route that wraps AuthProtectedRoutes */}
        <Route index element={<TaskListPage />} />{" "}
        {/* Child route with the "index" path, rendering the TaskListPage component */}
      </Route>
    </Routes>
  );
}

export default App; // Exporting the App component as the default export
