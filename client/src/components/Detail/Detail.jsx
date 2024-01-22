import { useSelector, useDispatch } from "react-redux";
import { getVideogameById } from "../../redux/actions";

import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Detail = () => {
  const videogame = useSelector((state) => state.renderDetailVideogame);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getVideogameById(id));
  }, []);

  return (
    <article>
      <h2>{videogame.name}</h2>
      <img src={videogame.image} alt={`${videogame.name} main image`} />
      <ul>
        {videogame.platforms?.map((platform, index) => {
          return <li key={index}>{platform}</li>;
        })}
      </ul>
      <p>{videogame.description}</p>
      <span>{videogame.released_date}</span>
      <strong>{videogame.rating}</strong>
      <ul>
        {videogame.genres?.map((genre, index) => {
          return <li key={index}>{genre.name}</li>;
        })}
      </ul>
    </article>
  );
};

export default Detail;
