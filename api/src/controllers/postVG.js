const { createGameInDB } = require("../services");
const { goodResponse, errorCatcher } = require("../helpers");

const postVG = async (req, res) => {
  const { name, image, platforms, description, released_date, rating, genres } =
    req.body;

  createGameInDB(
    name,
    image,
    platforms,
    description,
    released_date,
    rating,
    genres
  );

  goodResponse(res, 201, "Videogame created successfully");
};

module.exports = { postVG: errorCatcher(postVG) };
