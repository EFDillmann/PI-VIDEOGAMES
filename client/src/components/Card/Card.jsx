import { Link } from "react-router-dom";

import styles from "./Card.module.css";

const Card = ({
  id,
  name,
  image,
  genres,
  platforms,
  rating,
  released_date,
}) => {
  return (
    <Link to={`/videogame/${id}`}>
      <article className={styles.cardContainer}>
        <section className={styles.imageContainer}>
          <img
            width="426px"
            height="240px"
            src={image}
            alt={`${name} main image`}
          />
        </section>
        <h3>{name}</h3>
        <section className={styles.infoContainer}>
          <div className={styles.right}>
            <ul>
              {genres?.map((genre, index) => {
                return <li key={index}>{genre.name ?? genre}</li>;
              })}
            </ul>
            <ul>
              {platforms?.map((platform) => {
                return <li key={platform}>{platform}</li>;
              })}
            </ul>
          </div>
          <div className={styles.left}>
            <strong>{rating}</strong>
            <span>{released_date}</span>
          </div>
        </section>
      </article>
    </Link>
  );
};

export default Card;
