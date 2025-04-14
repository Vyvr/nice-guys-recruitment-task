"use client";

import { useState } from "react";
import styles from "./Header.module.css";
import { Button } from "react-bootstrap";
import LoginModal from "./components/loginModal/LoginModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.auth.role);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.headerWrapper}>
      {userRole === "user" ? (
        <Button variant="light" onClick={handleShow}>
          Log in
        </Button>
      ) : (
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      )}

      <LoginModal show={showModal} handleClose={handleClose} />
    </div>
  );
};

export default Header;
