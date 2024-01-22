import { useDispatch } from "react-redux";
import { reset, alphabeticOrder, ratingOrder } from "../../redux/actions";

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
      <button onClick={handleReset}>Reset</button>
      <button value="A-Z" onClick={handleAlphabeticOrder}>
        A-Z
      </button>
      <button value="Z-A" onClick={handleAlphabeticOrder}>
        Z-A
      </button>
      <button value="A" onClick={handleRatingOrder}>
        Ascendant
      </button>
      <button value="D" onClick={handleRatingOrder}>
        Descendant
      </button>
    </>
  );
};

export default Orders;
