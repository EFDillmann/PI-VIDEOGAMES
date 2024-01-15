const { ClientError } = require("../helpers");
const { getDataFromGenres } = require("../services");
const { validateString } = require("../helpers");

const validateGenres = async (req, res, next) => {
  const { genres } = req.body;
  if (genres) {
    req.body.genres = genres.map((genre) => {
      validateString(genre, "genre", 40, 2);
      if (/\d/.test(genre))
        throw new ClientError("Invalid game, genre not allowed numbers");
      if (genre.includes(" ")) genre = genre.replace(" ", "-");

      return genre.toLowerCase();
    });
  } else {
    const genresAPI = await getDataFromGenres();

    const validatedGenres = genresAPI.map((genre) => {
      validateString(genre, "genre", 40, 2);
      if (/\d/.test(genre))
        throw new ClientError("Invalid genre, genre not allowed numbers");
      if (genre.includes(" ")) genre = genre.replace(" ", "-");

      return genre.toLowerCase();
    });
    req.genres = validatedGenres;
  }

  next();
};

module.exports = validateGenres;
