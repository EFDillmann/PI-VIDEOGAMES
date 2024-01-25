import { Link } from "react-router-dom";

import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.landing}>
      <img
        src="../../public/assets/images/evolve-games.png"
        alt="Evolve games logo"
      />
      <Link to="/home">
        <button className={styles.landingBtn}>
          Begins to evolve
          <img
            src="../../public/assets/icons/react.svg"
            alt="Atom image"
            width="30px"
          />
        </button>
      </Link>
    </div>
  );
};

export default Landing;
