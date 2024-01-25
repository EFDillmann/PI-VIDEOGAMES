import { Link } from "react-router-dom";

import styles from "./Card.module.css";

const Card = ({ id, name, image, genres, rating, released_date }) => {
  const nameRender = name
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Link to={`/videogame/${id}`}>
      <article className={styles.cardContainer}>
        <section className={styles.imageContainer}>
          <img src={image} alt={`${name} main image`} />
        </section>
        <h3>{nameRender}</h3>
        <section className={styles.infoContainer}>
          <div className={styles.right}>
            <ul>
              {genres?.map((genre, index) => {
                return <li key={index}>{genre.name ?? genre}</li>;
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
