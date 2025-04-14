"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { UsersApiService } from "@/services/usersApiService";
import { User } from "@/types/userModels";
import { Loader } from "../components/loader/Loader";

export const Dashboard: React.FC = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const users = await UsersApiService.getUsers();
        setUsersList(users);
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
        <ul>
          {usersList.map((user) => (
            <li key={user.username}>
              <strong>{user.name}</strong> – {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
