import styles from "./Header.module.css";
import { Button } from "react-bootstrap";

export const Header: React.FC = () => {
  return (
    <div className={styles.headerWrapper}>
      <Button variant="light">Log in</Button>
    </div>
  );
};

export default Header;
