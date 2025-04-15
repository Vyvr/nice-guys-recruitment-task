"use client";

import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { User } from "@/types/userModel";
import { useAppDispatch } from "@/store/hooks";
import { addUser } from "@/store/slices/usersSlice";

interface CreateUserModalProps {
  show: boolean;
  handleClose: () => void;
}

const initialFormData = {
  name: "",
  username: "",
  email: "",
};

const formFields = [
  { label: "Name", name: "name", type: "text", placeholder: "Enter name" },
  {
    label: "Username",
    name: "username",
    type: "text",
    placeholder: "Enter username",
  },
  { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
];

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  show,
  handleClose,
}) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setError("");
  };

  const handleCloseModal = () => {
    resetForm();
    handleClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, username, email } = formData;

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
          {formFields.map(({ label, name, type, placeholder }) => (
            <Form.Group className="mb-2" key={name}>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                name={name}
                type={type}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                placeholder={placeholder}
                isInvalid={
                  !formData[name as keyof typeof formData] && error !== ""
                }
              />
            </Form.Group>
          ))}

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
