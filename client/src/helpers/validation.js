import limitDate from "./limitDate";

const validation = (data, name, value) => {
  let errors = {};

  if (name === "name") {
    if (!data.name) errors.name = "Name empty";
    else if (data.name.length < 2 || data.name.length > 40)
      errors.name = "Invalid name, must contain between 2 and 40 letters";
    else errors.name = "";
  }
  if (name === "image") {
    if (!data.image) errors.image = "Image empty";
    else if (!URL.canParse(data.image))
      errors.image = "Invalid image, it isn't URL";
    else errors.image = "";
  }
  if (name === "description") {
    if (!data.description) errors.description = "Description empty";
    else if (data.description.length < 10)
      errors.description = "Invalid description, is too short";
    else if (data.description.length > 256)
      errors.description = "Invalid description, is too long";
    else errors.description = "";
  }
  if (name === "released_date") {
    if (!data.released_date) errors.released_date = "Released date empty";
    else {
      const date = new Date(data.released_date);
      const parsedDate = date.toISOString().slice(0, 10);
      const limit = new Date(limitDate);

      if (isNaN(date.getTime()))
        errors.released_date = "Invalid released date, not is a date";
      else if (parsedDate !== data.released_date)
        errors.released_date =
          "Invalid released date, February can have a maximum of 29 days";
      else if (date > limit)
        errors.released_date = "Invalid released date, exceeds the limit date";
      else errors.released_date = "";
    }
  }
  if (name === "rating") {
    if (!data.rating) errors.rating = "Rating empty";
    else if (data.rating > 100 || data.rating < 0)
      errors.rating = "Invalid rating, must be between 0 and 100";
    else errors.rating = "";
  }
  if (name === "platforms") {
    if (!data.platforms) errors.platforms = "Platforms empty";
    else if (data.platforms.includes(value))
      errors.platforms = "Platform has already been added";
    else errors.platforms = "";
  }
  if (name === "genres") {
    if (!data.genres) errors.genres = "Genres empty";
    else if (data.genres.includes(value))
      errors.genres = "Genres has already been added";
    else errors.genres = "";
  }

  return errors;
};

export default validation;
