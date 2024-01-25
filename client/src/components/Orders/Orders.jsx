import { useDispatch } from "react-redux";
import { reset, alphabeticOrder, ratingOrder } from "../../redux/actions";

import styles from "./Orders.module.css";

const Orders = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(reset());
  };
  const handleAlphabeticOrder = (event) => {
    dispatch(alphabeticOrder(event.target.value));
  };
  const handleRatingOrder = (event) => {
    dispatch(ratingOrder(event.target.value));
  };
  return (
    <>
      <button onClick={handleReset} className={styles.ordersBtn}>
        Reset
      </button>
      <button
        value="A-Z"
        onClick={handleAlphabeticOrder}
        className={styles.ordersBtn}
      >
        A-Z
      </button>
      <button
        value="Z-A"
        onClick={handleAlphabeticOrder}
        className={styles.ordersBtn}
      >
        Z-A
      </button>
      <button
        value="A"
        onClick={handleRatingOrder}
        className={styles.ordersBtn}
      >
        Rating +
      </button>
      <button
        value="D"
        onClick={handleRatingOrder}
        className={styles.ordersBtn}
      >
        Rating -
      </button>
    </>
  );
};

export default Orders;
