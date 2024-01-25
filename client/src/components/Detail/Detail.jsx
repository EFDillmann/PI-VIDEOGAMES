import { useSelector, useDispatch } from "react-redux";
import { getVideogameById } from "../../redux/actions";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Spinner from "../Spinner/Spinner";

import styles from "./Detail.module.css";

const Detail = () => {
  const videogame = useSelector((state) => state.renderDetailVideogame);
  const dispatch = useDispatch();

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        await dispatch(getVideogameById(id));
        setIsLoading(false);
      }, 2000);
    };

    fetchData();
  }, [dispatch, id]);

  const nameRender = videogame[0]?.name
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <>
      {isLoading ? (
        <article className={styles.detailContainer}>
          <Spinner />
        </article>
      ) : (
        <article className={styles.detailContainer}>
          <div className={styles.detailMain}>
            <img
              src={videogame[0].image}
              alt={`${videogame[0].name} main image`}
            />
            <h2>
              {nameRender} ID: {videogame[0].id}
            </h2>
          </div>
          <div className={styles.detailText}>
            <div className={styles.left}>
              <ul className={styles.detailPlatforms}>
                <li className={styles.detailPlatformsTitle}>Available in: </li>
                {videogame[0].platforms?.map((platform, index) => (
                  <li key={index}>{platform}</li>
                ))}
              </ul>
              <ul className={styles.detailPlatforms}>
                <li className={styles.detailPlatformsTitle}>Genres: </li>
                {videogame[0].genres?.map((genre, index) => (
                  <li key={index}>{genre.name}</li>
                ))}
              </ul>
            </div>
            <div className={styles.right}>
              <div className={styles.detailDesc}>
                <p
                  dangerouslySetInnerHTML={{ __html: videogame[0].description }}
                ></p>
              </div>
              <span className={styles.detailExtras}>
                <strong>Released date: </strong>
                {videogame[0].released_date}
                <span>Rating: </span> <strong>{videogame[0].rating}</strong>
              </span>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default Detail;
