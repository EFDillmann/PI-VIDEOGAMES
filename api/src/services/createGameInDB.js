const { Videogame, Genre } = require("../db");

const createGameInDB = async (
  name,
  image,
  platforms,
  description,
  released_date,
  rating,
  genres
) => {
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
};

module.exports = createGameInDB;
