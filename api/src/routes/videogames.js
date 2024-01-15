const { Router } = require("express");

const { validateGame, validateGenres } = require("../middlewares");
const { postVG, getVGs, getVGById } = require("../controllers");

const videogames = Router();

videogames.get("/", getVGs);
videogames.post("/", validateGame, validateGenres, postVG);
videogames.get("/:id", getVGById);

module.exports = videogames;
