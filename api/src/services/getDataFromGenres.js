require("dotenv").config();
const axios = require("axios");

const { API_KEY } = process.env;
const URL_BASE = "https://api.rawg.io/api/genres";

const getGenres = async () => {
  const { data } = await axios.get(`${URL_BASE}?key=${API_KEY}`);

  const genreNames = data.results.map((genre) => genre.slug);
  const genres = [...new Set(genreNames)];

  return genres;
};

module.exports = getGenres;
