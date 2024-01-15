const { Router } = require("express");

const genres = Router();

const { validateGenres } = require("../middlewares");
const { getGenres } = require("../controllers");

genres.get("/", validateGenres, getGenres);

module.exports = genres;
