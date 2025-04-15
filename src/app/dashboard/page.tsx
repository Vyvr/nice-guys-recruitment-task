"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { UsersApiService } from "@/services/usersApiService";
import { Loader } from "../components/loader/Loader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUsers } from "@/store/slices/usersSlice";
import UserCard from "./components/userCard/UserCard";
import { Form, Pagination } from "react-bootstrap";
import { selectIsAdmin } from "@/store/slices/authSlice";

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector((state) => state.users.users);
  const isAdmin = useAppSelector(selectIsAdmin);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterText, setFilterText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const fetchedUsers = await UsersApiService.getUsers();

        // Na potrzebę zachowania lokalnych użytkowników i pobierania zaktualizowanych z bazy
        const mergedUsers = [
          ...fetchedUsers,
          ...usersList.filter((u) => u.isLocal),
        ];
        dispatch(setUsers(mergedUsers));
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // -----------------do paginacji i filtrowania-----------------
  const visibleUsers = usersList.filter((user) => {
    const matchesRole = isAdmin || user.id < 7 || user.id > 10;
    const matchesFilter =
      user.name.toLowerCase().includes(filterText.toLowerCase()) ||
      user.username.toLowerCase().includes(filterText.toLowerCase()) ||
      user.email.toLowerCase().includes(filterText.toLowerCase());

    return matchesRole && matchesFilter;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = visibleUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(visibleUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => paginate(i)}
      >
        {i}
      </Pagination.Item>
    );
  }
  //------------------------------------------------

  if (error !== "") {
    return <p className="text-center text-danger mt-1">{error}</p>;
  }

  return (
    <div className={styles.dashboardWrapper}>
      <h1>Users:</h1>

      <Form.Control
        type="text"
        placeholder="Search by name, username or email"
        className="mb-4"
        value={filterText}
        onChange={(e) => {
          setFilterText(e.target.value);
          setCurrentPage(1);
        }}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.userCardsWrapper}>
            {currentUsers.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
              />
            ))}
          </div>

          <Pagination className="justify-content-center mt-4">
            {paginationItems}
          </Pagination>
        </>
      )}
    </div>
  );
};

export default Dashboard;
