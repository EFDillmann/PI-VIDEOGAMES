import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../../redux/actions";
import { useState } from "react";

const SearchBar = () => {
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
    <form>
      <input
        type="text"
        name="query"
        placeholder="GTA V..."
        onChange={handleChange}
        value={query}
      />
      <input type="submit" value="Search" onClick={handleSubmit} />
    </form>
  );
};

export default SearchBar;
