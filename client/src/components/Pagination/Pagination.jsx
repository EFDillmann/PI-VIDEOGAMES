import { useDispatch, useSelector } from "react-redux";
import { modifyPage, topPage, bottomPage } from "../../redux/actions";

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
    <article>
      <section>
        <button onClick={onBottomPage}>{"|<"}</button>
      </section>
      <section>
        <button onClick={backPage}>{"<"}</button>
      </section>
      <h3>{current}</h3>
      <section>
        <button onClick={nextPage}>{">"}</button>
      </section>
      <section>
        <button onClick={onTopPage}>{">|"}</button>
      </section>
    </article>
  );
};

export default Pagination;
