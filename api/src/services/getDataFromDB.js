const { Op } = require("sequelize");

const { Videogame, Genre } = require("../db");
const { ClientError } = require("../helpers");

const getAllVGsDB = async () => {
  const dataDB = await Videogame.findAll({ include: Genre });

  return dataDB;
};
const getVGByIdDB = async (id) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!uuidRegex.test(id)) throw new ClientError("Invalid id, must be uuid");

  const dataDB = await Videogame.findByPk(id, { include: Genre });

  if (dataDB === null) throw new ClientError("Game id not found", 404);

  return dataDB;
};
const getVGsByNameDB = async (game) => {
  game = game.toLowerCase();

  const dataDB = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${game}%`,
      },
    },
    include: Genre,
  });

  return dataDB;
};

module.exports = {
  getAllVGsDB,
  getVGByIdDB,
  getVGsByNameDB,
};
