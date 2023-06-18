import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/features/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleLogout = () => {
    // Handle logout logic

    dispatch(logout());
    navigation("/login");
  };

  return (
    <Navbar bg="#ffffff" expand="lg" sticky="top">
      <Navbar.Brand as={NavLink} href="/">
        <img src={require("../assets/logo.png")} alt="Logo" height="30" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
