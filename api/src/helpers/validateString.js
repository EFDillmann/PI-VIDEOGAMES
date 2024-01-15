const validateString = (string, fact, limit1, limit2) => {
  if (typeof string !== "string")
    throw new ClientError(`Invalid ${fact}, ${string} is not a string`);
  if (/^\s*$/.test(string))
    throw new ClientError(`Invalid ${fact}, must contain at least 2 letters`);
  if (string.length > limit1 || string.length < limit2)
    throw new ClientError(
      `Invalid ${fact}, must contain between 2 and 40 letters`
    );
};

module.exports = validateString;
