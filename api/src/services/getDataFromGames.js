require("dotenv").config();
const axios = require("axios");
const { ClientError } = require("../helpers");

const { API_KEY } = process.env;
const URL_BASE = "https://api.rawg.io/api/games";

const getAllVGs = async () => {
  let videogames = [];
  let pageNum = 1;

  while (videogames.length < 100) {
    const { data } = await axios.get(
      `${URL_BASE}?key=${API_KEY}&page=${pageNum}&page_size=25`
    );

    videogames = [...videogames, ...data.results];

    pageNum++;
  }

  const gamesFiltered = videogames.map((game) => {
    const {
      id,
      slug,
      background_image,
      parent_platforms,
      description,
      released,
      metacritic,
      genres,
    } = game;

    const platforms = parent_platforms.map(
      (platform) => platform.platform.name
    );
    const genresNames = genres.map((genre) => genre.name);

    return {
      id,
      name: slug,
      image: background_image,
      platforms,
      description,
      released_date: released,
      rating: metacritic ?? 0,
      genres: genresNames,
    };
  });

  return gamesFiltered;
};
const getVGById = async (idParam) => {
  try {
    const peticion = await axios.get(`${URL_BASE}/${idParam}?key=${API_KEY}`);

    const {
      id,
      slug,
      background_image,
      parent_platforms,
      description,
      released,
      metacritic,
      genres,
    } = peticion.data;

    const platforms = parent_platforms.map(
      (platform) => platform.platform.name
    );
    const genresNames = genres.map((genre) => genre.name);

    const game = {
      id,
      name: slug,
      image: background_image,
      platforms,
      description,
      released_date: released,
      rating: metacritic ?? 0,
      genres: genresNames,
    };

    return game;
  } catch (error) {
    throw new ClientError("Invalid id, not found", 404);
  }
};
const getVGsByName = async (game) => {
  game = game.toLowerCase();

  const { data } = await axios.get(
    `${URL_BASE}?key=${API_KEY}&search=${game}&page_size=15`
  );

  const gamesFiltered = [];

  data.results.forEach((game) => {
    const {
      id,
      slug,
      background_image,
      parent_platforms,
      description,
      released,
      metacritic,
      genres,
    } = game;

    const platforms = parent_platforms.map(
      (platform) => platform.platform.name
    );
    const genresNames = genres.map((genre) => genre.name);

    gamesFiltered.push({
      id,
      name: slug,
      description,
      platforms,
      image: background_image,
      released_date: released,
      rating: metacritic ?? 0,
      genres: genresNames,
    });
  });

  return gamesFiltered;
};

module.exports = {
  getAllVGs,
  getVGById,
  getVGsByName,
};
