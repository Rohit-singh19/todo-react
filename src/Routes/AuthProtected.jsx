import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../Components/Header";

const AuthProtectedRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state?.authReducer);

  return isLoggedIn ? (
    <div
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      <Container>
        <Header />
        <Outlet />
      </Container>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthProtectedRoutes;
