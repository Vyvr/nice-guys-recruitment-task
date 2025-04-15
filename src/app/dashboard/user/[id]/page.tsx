"use client";

import styles from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { Button, Card, ListGroup } from "react-bootstrap";
import { selectIsAdmin } from "@/store/slices/authSlice";

const UserProfilePage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const users = useAppSelector((state) => state.users.users);
  const user = users.find((u) => u.id === Number(id));
  const profileImagePath = "/profile-circle.svg";

  const isAdmin = useAppSelector(selectIsAdmin);

  const handleGoBack = () => router.back();

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className={styles.userProfileWrapper}>
      <Button variant="primary" onClick={handleGoBack}>
        Go back
      </Button>
      <div className={styles.userInfoWrapper}>
        <Card className={styles.userInfoCard}>
          <Card.Header as="h5">{user.name}</Card.Header>
          <Card.Img src={profileImagePath} />
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <strong>Username: </strong> {user.username}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email: </strong> {user.email}
              </ListGroup.Item>
              {isAdmin && (
                <ListGroup.Item>
                  <strong>Address: </strong>
                  {user.address ? (
                    <>
                      {user.address.city} {user.address.street}{" "}
                      {user.address.suite} {user.address.zipcode}{" "}
                    </>
                  ) : (
                    "User has no address"
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default UserProfilePage;
