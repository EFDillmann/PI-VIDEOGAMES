import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.first}>
        <div className={styles.second}>
          <div className={styles.third}></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
