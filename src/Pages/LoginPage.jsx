import React, { useState } from "react";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/features/authSlice";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    // Username validation: No spaces allowed and required
    if (username.trim() === "") {
      setError("Username is required");
      return;
    }
    if (username.includes(" ")) {
      setError("Username cannot contain spaces");
      return;
    }

    // Password validation: Minimum length of 8 characters, required, and specific requirements
    if (password.trim() === "") {
      setError("Password is required");
      return;
    }
    if (password.length < 8) {
      setError("Password should be at least 8 characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password should contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password should contain at least one lowercase letter");
      return;
    }
    if (!/\d/.test(password)) {
      setError("Password should contain at least one number");
      return;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      setError("Password should contain at least one special character");
      return;
    }

    setIsLoading(true);

    // Simulating a login request
    setTimeout(() => {
      dispatch(login(username));
      navigate("/");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              Password should be at least 8 characters long and contain at least
              one uppercase letter, one lowercase letter, one number, and one
              special character (!@#$%^&*)
            </Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            block="true"
            disabled={isLoading}
            style={{ marginTop: "1rem" }}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mr-2"
                />{" "}
                Loading...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default LoginPage;
