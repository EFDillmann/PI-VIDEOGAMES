import SearchBar from "../SearchBar/SearchBar";
import Orders from "../Orders/Orders";
import Filters from "../Filters/Filters";
import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <SearchBar />
      <Orders />
      <Filters />
      <Cards />
      <Pagination />
      <Link to="/post">
        <button>Create</button>
      </Link>
    </>
  );
};

export default Home;
