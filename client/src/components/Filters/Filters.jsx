import { useDispatch, useSelector } from "react-redux";
import { filterByGenres, filterByOrigin } from "../../redux/actions";

import styles from "./Filters.module.css";

const Filters = () => {
  const genres = useSelector((state) => state.genres);
  const filterGenre = useSelector((state) => state.filterGenre);
  const filterOrigin = useSelector((state) => state.filterOrigin);

  const dispatch = useDispatch();

  const handleByGenre = (event) => {
    dispatch(filterByGenres(event.target.value));
  };
  const handleByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
  };
  return (
    <>
      <select
        onChange={handleByOrigin}
        value={filterOrigin}
        className={styles.filterSelect}
      >
        <option value="ALL">ALL</option>
        <option value="DB">DB</option>
        <option value="API">API</option>
      </select>
      <select
        onChange={handleByGenre}
        value={filterGenre}
        className={styles.filterSelect}
      >
        <option value="ALLGENRES">ALL GENRES</option>
        {genres.map((genre) => {
          return (
            <option key={genre.id} value={genre.name.toUpperCase()}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Filters;
