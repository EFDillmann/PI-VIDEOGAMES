const {
  getVGsByName,
  getVGsByNameDB,
  getAllVGs,
  getAllVGsDB,
} = require("../services");
const { goodResponse, errorCatcher, ClientError } = require("../helpers");

const getVGs = async (req, res) => {
  const { name } = req.query;

  if (name) {
    const data = {
      db: await getVGsByNameDB(name),
      api: await getVGsByName(name),
    };

    if ((data.db.length === 0) & (data.api.length === 0))
      throw new ClientError("Videogame not found", 404);

    goodResponse(res, 200, "Get data successfully", data);
  }

  const data = { db: await getAllVGsDB(), api: await getAllVGs() };
  goodResponse(res, 200, "All data charged", data);
};

module.exports = {
  getVGs: errorCatcher(getVGs),
};
