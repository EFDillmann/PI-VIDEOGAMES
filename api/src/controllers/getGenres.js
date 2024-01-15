const { createGenresInDB } = require("../services");
const { goodResponse, errorCatcher } = require("../helpers");

const getGenres = async (req, res) => {
  const genres = req.genres;

  const dataLoaded = await createGenresInDB(genres);

  goodResponse(
    res,
    200,
    "Genres successfully loaded into the database.",
    dataLoaded
  );
};

module.exports = { getGenres: errorCatcher(getGenres) };
