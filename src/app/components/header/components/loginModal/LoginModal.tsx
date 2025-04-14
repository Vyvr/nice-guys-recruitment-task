"use client";

import Loader from "@/app/components/loader/Loader";
import { AuthService } from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { loginAsAdmin } from "@/store/slices/authSlice";
import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, handleClose }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username || !password) {
      setError("Please fill whole form");
      setIsLoading(false);
      return;
    }

    const loginSuccess = AuthService.login(username, password);

    if (loginSuccess) {
      setError("");
      dispatch(loginAsAdmin());
      resetFormState();
      handleClose();
    } else {
      setError("Invalid username or password");
    }

    setIsLoading(false);
  };

  const resetFormState = () => {
    setUsername("");
    setPassword("");
    setError("");
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    resetFormState();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isInvalid={!username && error !== ""}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!password && error !== ""}
            />
          </Form.Group>

          {error && (
            <Alert variant="danger" className="mt-2">
              {error}
            </Alert>
          )}

          {isLoading && <Loader />}

          <Button variant="primary" type="submit" className="w-100 mt-2">
            Log in
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
