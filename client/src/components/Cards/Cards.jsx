import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames, getGenres } from "../../redux/actions";

import { useEffect } from "react";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";

import styles from "./Cards.module.css";

const Cards = () => {
  const videogames = useSelector((state) => state.renderVideogames);
  const genres = useSelector((state) => state.genres);
  const current = useSelector((state) => state.currentPage);
  const totalVideogames = useSelector((state) => state.totalVideogames);
  const itemsByPage = useSelector((state) => state.itemsByPage);

  const dispatch = useDispatch();

  let start = (current - 1) * itemsByPage;
  let end = start + itemsByPage;
  if (end > totalVideogames) end = totalVideogames;
  if (start < 0) start = 0;

  useEffect(() => {
    if (videogames.length === 0) dispatch(getAllVideogames());
    if (genres.length === 0) dispatch(getGenres());
  }, []);
  {
    return videogames.length !== 0 ? (
      <article className={styles.cardsContainer}>
        {videogames
          ?.map((vg) => {
            const nameFix = vg.name.replaceAll("-", " ");
            return (
              <Card
                key={vg.id}
                id={vg.id}
                name={nameFix}
                image={vg.image}
                genres={vg.genres}
                rating={vg.rating}
                released_date={vg.released_date}
              />
            );
          })
          .slice(start, end)}
      </article>
    ) : (
      <article className={styles.cardsContainer}>
        <Spinner />
      </article>
    );
  }
};

export default Cards;
