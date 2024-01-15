module.exports = {
  getAllVGs: require("./getDataFromGames").getAllVGs,
  getVGByIdAPI: require("./getDataFromGames").getVGById,
  getVGsByName: require("./getDataFromGames").getVGsByName,
  getDataFromGenres: require("./getDataFromGenres"),
  createGenresInDB: require("./createGenresInDB"),
  createGameInDB: require("./createGameInDB"),
  getAllVGsDB: require("./getDataFromDB").getAllVGsDB,
  getVGByIdDB: require("./getDataFromDB").getVGByIdDB,
  getVGsByNameDB: require("./getDataFromDB").getVGsByNameDB,
};
