require("./db.js");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { ACCEPTED_ORIGINS } = process.env;
const { videogamesRoutes, genresRoutes } = require("./routes");
const { errorResponse, ServerError } = require("./helpers");

const server = express();

server.name = "API";

server.disable("x-powered-by");
server.use(morgan("dev"));
server.use(
  cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin) || !origin)
        return callback(null, true);

      return callback(
        new ServerError("Problem of cors, origin unahutorized", 503)
      );
    },
  })
);
//http://localhost:5173/ server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });
server.use(express.json());

server.use("/genres", genresRoutes);
server.use("/videogames", videogamesRoutes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.statusCode || 500;
  const message = err.message || err;

  errorResponse(res, status, message);
});

module.exports = server;
