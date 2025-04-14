import styles from "./Loader.module.css";
import { Spinner } from "react-bootstrap";

export const Loader: React.FC = () => {
  return (
    <div className={styles.loaderWrapper}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loader;
