const { Videogame, Genre } = require("../db");

const { ClientError } = require("../helpers/errors");

const createGameInDB = async (
  name,
  image,
  platforms,
  description,
  released_date,
  rating,
  genres
) => {
  const alreadyExist = await Videogame.findOne({ where: { name: name } });

  if (alreadyExist?.dataValues.id)
    throw new ClientError("The videogame already exists");

  const newGame = await Videogame.create({
    name,
    image,
    platforms,
    description,
    released_date,
    rating,
  });

  const genresVG = await Promise.all(
    genres.map(async (genre) => {
      const [genreVG] = await Genre.findOrCreate({
        where: { name: genre },
      });
      return genreVG;
    })
  );

  await newGame.setGenres(genresVG);

  const data = await Videogame.findOne({
    where: { id: newGame.dataValues.id },
    include: Genre,
  });

  return data;
};

module.exports = createGameInDB;
