import { useSelector, useDispatch } from "react-redux";
import { postVideogame } from "../../redux/actions";

import { useState } from "react";

import limitDate from "../../helpers/limitDate";
import validation from "../../helpers/validation";

const Post = () => {
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const dispatch = useDispatch();

  const [videogameData, setVideogameData] = useState({
    name: "",
    image: "",
    description: "",
    released_date: "",
    rating: "",
    platforms: [],
    genres: [],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (Array.isArray(videogameData[name])) {
      if (videogameData[name].includes(value)) {
        setVideogameData({ ...videogameData });
        // setErrors(validation(videogameData, name, value));
      } else {
        setVideogameData({
          ...videogameData,
          [name]: [...videogameData[name], value],
        });
        // setErrors(validation(videogameData, name, value));
      }
    } else {
      setVideogameData({
        ...videogameData,
        [name]: value,
      });
    }
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    handleChange(event);
    setErrors(validation(videogameData, name, value));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const hadErrors = Object.values(errors);
    if (hadErrors.length === 0 || hadErrors[0].length === 0) {
      dispatch(postVideogame(videogameData));
      console.log("creado");
    }
  };

  return (
    <form method="post">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        placeholder="Grand-Thef-Auto V"
        onBlur={handleBlur}
        onChange={handleChange}
        value={videogameData.name}
      />
      {errors.name && <p>{errors.name}</p>}
      <label htmlFor="image">Image</label>
      <input
        type="text"
        name="image"
        placeholder="https://your-image.com"
        onBlur={handleBlur}
        onChange={handleChange}
        value={videogameData.image}
      />
      {errors.image && <p>{errors.image}</p>}
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        placeholder="Game developed by Rockstar Games in ..."
        onBlur={handleBlur}
        onChange={handleChange}
        value={videogameData.description}
      />
      {errors.description && <p>{errors.description}</p>}
      <label htmlFor="released_date">Released date</label>
      <input
        type="date"
        name="released_date"
        min="1958-01-01"
        max={limitDate}
        onBlur={handleBlur}
        onChange={handleChange}
        value={videogameData.released_date}
      />
      {errors.released_date && <p>{errors.released_date}</p>}
      <label htmlFor="rating">Rating</label>
      <input
        type="number"
        name="rating"
        placeholder="99"
        onBlur={handleBlur}
        onChange={handleChange}
        value={videogameData.rating}
      />
      {errors.rating && <p>{errors.rating}</p>}
      <label htmlFor="platforms">Platforms</label>
      <select name="platforms" onChange={handleBlur}>
        {platforms.map((platform, index) => {
          return (
            <option key={index} value={platform.toUpperCase()}>
              {platform.toUpperCase()}
            </option>
          );
        })}
      </select>
      {errors.platforms && <p>{errors.platforms}</p>}
      <label htmlFor="genres">Genres</label>
      <select name="genres" onChange={handleChange}>
        {genres.map((genre) => {
          return (
            <option key={genre.id} value={genre.name.toLowerCase()}>
              {genre.name}
            </option>
          );
        })}
      </select>
      {errors.genres && <p>{errors.genres}</p>}
      <input type="submit" value="Create" onClick={handleSubmit} />
    </form>
  );
};

export default Post;
