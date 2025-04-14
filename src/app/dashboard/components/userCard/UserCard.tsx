"use client";

import styles from "./UserCard.module.css";
import { UserBasicData } from "@/types/userModel";
import { useRouter } from "next/navigation";
import { Button, Card } from "react-bootstrap";

export const UserCard: React.FC<UserBasicData> = ({ id, name, username }) => {
  const router = useRouter();

  const handleGoToProfile = () => router.push(`/dashboard/user/${id}`);

  return (
    <Card className={styles.cardWrapper} onClick={handleGoToProfile}>
      <Card.Body className={styles.cardBody}>
        <h5 className={styles.cardTitle}>{name}</h5>
        <h5 className={styles.cardTitle}>"{username}"</h5>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
