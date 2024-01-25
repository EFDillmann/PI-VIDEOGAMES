import { useSelector, useDispatch } from "react-redux";
import { postVideogame } from "../../redux/actions";

import { useState } from "react";
import FormInput from "../FormInput/FormInput";

import limitDate from "../../helpers/limitDate";
import validation from "../../helpers/validation";

import styles from "./Post.module.css";

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
  const [disabled, setDisabled] = useState(true);

  const isDisabled = () => {
    const hadErrors = Object.values(errors);
    const hadData = Object.values(videogameData).every(
      (data) => data.length > 0
    );

    if (hadErrors[0]?.length === 0 && hadData) {
      setDisabled(false);
    } else setDisabled(true);
  };

  const handleDelete = (prop, value) => {
    const filterData = videogameData[prop].filter((data) => data !== value);
    setVideogameData({ ...videogameData, [prop]: filterData });
  };

  const handleFieldChange = ({ target, type }) => {
    const { name, value } = target;

    if (Array.isArray(videogameData[name])) {
      setVideogameData({
        ...videogameData,
        [name]: videogameData[name].includes(value)
          ? [...videogameData[name]]
          : [...videogameData[name], value],
      });
      setErrors(validation(videogameData, name, value));
    } else {
      setVideogameData({
        ...videogameData,
        [name]: value,
      });
    }

    if (type === "blur") {
      setErrors(validation(videogameData, name, value));
    }

    isDisabled();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(postVideogame(videogameData));
    setVideogameData({
      name: "",
      image: "",
      description: "",
      released_date: "",
      rating: "",
      platforms: [],
      genres: [],
    });
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className={styles.formContainer}
    >
      <FormInput
        label="Name"
        type="text"
        name="name"
        placeholder="Grand-Thef-Auto V"
        onBlur={handleFieldChange}
        onChange={handleFieldChange}
        value={videogameData.name}
        className={errors?.name && styles.borderRed}
      />
      {errors?.name && <p className={styles.errorP}>{errors.name}</p>}
      <FormInput
        label="Image"
        type="text"
        name="image"
        placeholder="https://your-image.com"
        onBlur={handleFieldChange}
        onChange={handleFieldChange}
        value={videogameData.image}
        className={errors?.image && styles.borderRed}
      />
      {errors?.image && <p className={styles.errorP}>{errors.image}</p>}
      <FormInput
        label="Description"
        type="text"
        name="description"
        placeholder="Game developed by Rockstar Games in ..."
        onBlur={handleFieldChange}
        onChange={handleFieldChange}
        value={videogameData.description}
        className={errors?.description && styles.borderRed}
      />
      {errors?.description && (
        <p className={styles.errorP}>{errors.description}</p>
      )}
      <FormInput
        label="Released date"
        type="date"
        name="released_date"
        onBlur={handleFieldChange}
        onChange={handleFieldChange}
        value={videogameData.released_date}
        min="1958-01-01"
        max={limitDate}
        className={errors?.released_date && styles.borderRed}
      />
      {errors?.released_date && (
        <p className={styles.errorP}>{errors.released_date}</p>
      )}
      <FormInput
        label="Rating"
        type="number"
        name="rating"
        placeholder="99"
        onBlur={handleFieldChange}
        onChange={handleFieldChange}
        value={videogameData.rating}
        className={errors?.rating && styles.borderRed}
      />
      {errors?.rating && <p className={styles.errorP}>{errors.rating}</p>}
      <FormInput
        label="Platforms"
        type="select"
        name="platforms"
        onChange={handleFieldChange}
        options={platforms}
        className={errors?.platforms && styles.borderRed}
      />
      <div className={styles.addedPost}>
        {videogameData.platforms?.map((platform, index) => {
          return (
            <p key={index} className={styles.addedPlatform}>
              {platform}
              <a
                className={styles.deleteBtn}
                onClick={() => handleDelete("platforms", platform)}
              >
                -
              </a>
            </p>
          );
        })}
      </div>
      {errors?.platforms && <p className={styles.errorP}>{errors.platforms}</p>}
      <FormInput
        label="Genres"
        type="select"
        name="genres"
        onChange={handleFieldChange}
        options={genres}
        className={errors?.genres && styles.borderRed}
      />
      <div className={styles.addedPost}>
        {videogameData.genres?.map((genre, index) => {
          return (
            <p key={index} className={styles.addedPlatform}>
              {genre}
              <a
                className={styles.deleteBtn}
                onClick={() => handleDelete("genres", genre)}
              >
                -
              </a>
            </p>
          );
        })}
      </div>
      {errors?.genres && <p className={styles.errorP}>{errors.genres}</p>}
      <input
        type="submit"
        value="Create"
        disabled={disabled}
        className={styles.submitPost}
      />
    </form>
  );
};

export default Post;
