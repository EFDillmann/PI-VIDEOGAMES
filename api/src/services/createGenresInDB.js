const { Genre } = require("../db");

const createGenresInDB = async (genres) => {
  const data = await Promise.all(
    genres.map(async (genre) => {
      const [data] = await Genre.findOrCreate({ where: { name: genre } });
      return data;
    })
  );
  return data;
};

module.exports = createGenresInDB;
