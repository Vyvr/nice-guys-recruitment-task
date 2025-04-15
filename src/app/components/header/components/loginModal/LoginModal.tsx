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

const initialFormData = {
  username: "",
  password: "",
};

const loginFormFields = [
  {
    label: "Username",
    name: "username",
    type: "text",
    placeholder: "Enter username",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter password",
  },
];

const LoginModal: React.FC<LoginModalProps> = ({ show, handleClose }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFormState = () => {
    setFormData(initialFormData);
    setError("");
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    resetFormState();
    handleClose();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { username, password } = formData;

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

  return (
    <Modal show={show} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          {loginFormFields.map(({ label, name, type, placeholder }) => (
            <Form.Group className="mb-2" key={name}>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                name={name}
                type={type}
                placeholder={placeholder}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                isInvalid={
                  !formData[name as keyof typeof formData] && error !== ""
                }
              />
            </Form.Group>
          ))}

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
