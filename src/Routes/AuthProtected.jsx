import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../Components/Header";

const AuthProtectedRoutes = () => {
  // Accessing the isLoggedIn state from the authReducer using useSelector hook
  const { isLoggedIn } = useSelector((state) => state?.authReducer);

  // Checking if the user is logged in
  return isLoggedIn ? (
    // If logged in, render the protected routes
    <div
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      <Container>
        <Header />
        <Outlet /> {/* Renders the nested routes */}
      </Container>
    </div>
  ) : (
    // If not logged in, redirect to the login page
    <Navigate to="/login" />
  );
};

export default AuthProtectedRoutes;
