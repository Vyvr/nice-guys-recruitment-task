"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./Header.module.css";
import LoginModal from "./components/loginModal/LoginModal";
import CreateUserModal from "./components/createUserModal/CreateUserModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.auth.role);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  const handleShowCreateUserModal = () => setShowCreateUserModal(true);
  const handleCloseCreateUserModal = () => setShowCreateUserModal(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.headerWrapper}>
      {userRole === "user" ? (
        <Button variant="light" onClick={handleShowLoginModal}>
          Log in
        </Button>
      ) : (
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      )}
      <Button variant="warning" onClick={handleShowCreateUserModal}>
        Create user
      </Button>

      <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />
      <CreateUserModal
        show={showCreateUserModal}
        handleClose={handleCloseCreateUserModal}
      />
    </div>
  );
};

export default Header;
