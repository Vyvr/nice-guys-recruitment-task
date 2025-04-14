"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { UsersApiService } from "@/services/usersApiService";
import { Loader } from "../components/loader/Loader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUsers } from "@/store/slices/usersSlice";
import UserCard from "./components/userCard/UserCard";
import { Button, Pagination } from "react-bootstrap";

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector((state) => state.users.users);

  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.dashboardWrapper}>
      <h1>Users:</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.userCardsWrapper}>
          {usersList.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
