const { getVGByIdAPI, getVGByIdDB } = require("../services");
const { goodResponse, errorCatcher } = require("../helpers");

const getVGById = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    const data = await getVGByIdDB(id);
    return goodResponse(res, 200, "xd", data);
  }
  const data = await getVGByIdAPI(id);

  return goodResponse(res, 200, "Searching by id", data);
};

module.exports = { getVGById: errorCatcher(getVGById) };
