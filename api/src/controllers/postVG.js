const { createGameInDB } = require("../services");
const { goodResponse, errorCatcher } = require("../helpers");

const postVG = async (req, res) => {
  const { name, image, platforms, description, released_date, rating, genres } =
    req.body;

  const data = await createGameInDB(
    name,
    image,
    platforms,
    description,
    released_date,
    rating,
    genres
  );

  return goodResponse(res, 201, "Videogame created successfully", data);
};

module.exports = { postVG: errorCatcher(postVG) };
