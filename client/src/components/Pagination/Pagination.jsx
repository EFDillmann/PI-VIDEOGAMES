import { useDispatch, useSelector } from "react-redux";
import { modifyPage, topPage, bottomPage } from "../../redux/actions";

import styles from "./Pagination.module.css";

const Pagination = () => {
  const current = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();

  const backPage = () => {
    dispatch(modifyPage(-1));
  };
  const nextPage = () => {
    dispatch(modifyPage(1));
  };
  const onTopPage = () => {
    dispatch(topPage());
  };
  const onBottomPage = () => {
    dispatch(bottomPage());
  };

  return (
    <article className={styles.paginationContainer}>
      <section className={styles.btns}>
        <button onClick={onBottomPage} className={styles.paginationBtn}>
          {"|<"}
        </button>
        <button onClick={backPage} className={styles.paginationBtn}>
          {"<"}
        </button>
      </section>
      <h3>{current}</h3>
      <section className={styles.btns}>
        <button onClick={nextPage} className={styles.paginationBtn}>
          {">"}
        </button>
        <button onClick={onTopPage} className={styles.paginationBtn}>
          {">|"}
        </button>
      </section>
    </article>
  );
};

export default Pagination;
