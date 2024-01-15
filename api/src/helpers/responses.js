const goodResponse = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    error: false,
    message,
    data,
  });
};
const errorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    error: true,
    message,
  });
};

module.exports = {
  goodResponse,
  errorResponse,
};
