import Search from "../Search/Search";

import { Link, useLocation } from "react-router-dom";

import styles from "./NavBar.module.css";

const NavBar = () => {
  const { pathname } = useLocation();
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img
          src="../../public/assets/images/evolve-games.png"
          alt="Evolve games logo"
          width="55px"
          className={styles.logoNav}
        />
      </Link>
      <ul className={styles.sectionsNav}>
        <li>
          <Link className={styles.li} to="/home">
            Home
            <img
              src="../../public/assets/icons/house-solid.svg"
              alt="Home icon menú"
              width="30px"
              height="30px"
            />
          </Link>
        </li>
        <li>
          <Link className={styles.li} to="/post">
            Create
            <img
              src="../../public/assets/icons/plus-solid.svg"
              alt="Home icon menú"
              width="30px"
              height="30px"
            />
          </Link>
        </li>
      </ul>
      {pathname === "/home" && <Search />}
    </nav>
  );
};

export default NavBar;
