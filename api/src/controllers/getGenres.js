const { createGenresInDB } = require("../services");
const { goodResponse, errorCatcher } = require("../helpers");

const getGenres = async (req, res) => {
  const genres = req.genres;

  const dataLoaded = await createGenresInDB(genres);

  return goodResponse(
    res,
    201,
    "Genres successfully loaded into the database.",
    dataLoaded
  );
};

module.exports = { getGenres: errorCatcher(getGenres) };
