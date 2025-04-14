"use client";

import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { User, UserAddress } from "@/types/userModel";
import { useAppDispatch } from "@/store/hooks";
import { addUser } from "@/store/slices/usersSlice";

interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  show,
  handleClose,
}) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setUsername("");
    setEmail("");
    setStreet("");
    setSuite("");
    setCity("");
    setZipcode("");
    setError("");
  };

  const handleCloseModal = () => {
    resetForm();
    handleClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !username || !email) {
      setError("Please fill all fields.");
      return;
    }

    const newUser: User = {
      id: Math.floor(Math.random() * 10000),
      name,
      username,
      email,
      isLocal: true,
    };
    dispatch(addUser(newUser));
    resetForm();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <Button variant="primary" type="submit" className="w-100 mt-2">
            Create User
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateUserModal;
