import Orders from "../Orders/Orders";
import Filters from "../Filters/Filters";
import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeMenu}>
        <Orders />
        <Filters />
      </div>
      <Cards />
      <Pagination />
    </div>
  );
};

export default Home;
