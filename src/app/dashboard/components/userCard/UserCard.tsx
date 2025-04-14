import styles from "./UserCard.module.css";
import { UserBasicData } from "@/types/userModels";
import { Button, Card } from "react-bootstrap";

export const UserCard: React.FC<UserBasicData> = ({ id, name, username }) => {
  return (
    <Card className={styles.cardWrapper}>
      <Card.Body className={styles.cardBody}>
        <h5 className={styles.cardTitle}>{name}</h5>
        <h5 className={styles.cardTitle}>"{username}"</h5>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
