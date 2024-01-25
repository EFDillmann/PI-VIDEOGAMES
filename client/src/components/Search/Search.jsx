import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../../redux/actions";

import { useState } from "react";

import styles from "./Search.module.css";

const Search = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.length !== 0) {
      dispatch(getVideogamesByName(query.toLowerCase()));
      setQuery("");
    }
  };
  return (
    <form className={styles.searchNav}>
      <input
        type="text"
        name="query"
        placeholder="GTA V..."
        onChange={handleChange}
        value={query}
        className={styles.inputText}
      />
      <input
        type="submit"
        value="Search"
        onClick={handleSubmit}
        className={styles.inputSubmit}
      />
    </form>
  );
};

export default Search;
