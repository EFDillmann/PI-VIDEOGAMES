const { validateString, ClientError, limitDate } = require("../helpers");

const validateGame = (req, res, next) => {
  const { name, image, platforms, description, released_date, rating } =
    req.body;

  if (!name) throw new ClientError("Invalid game, name is required");
  validateString(name, "game", 40, 2);

  if (!description)
    throw new ClientError("Invalid game, description is required");
  validateString(description, "game", 256, 10);

  if (!platforms || platforms.length < 1)
    throw new ClientError("Invalid game, must have platforms");
  if (!Array.isArray(platforms))
    throw new ClientError("Invalid game, platforms must be a array");
  req.body.platforms = platforms.map((platform) => {
    validateString(platform, "platform", 40, 2);
    if (platform.includes(" ")) platform = platform.replace(" ", "-");
    return platform.toUpperCase();
  });

  if (!URL.canParse(image))
    throw new ClientError("Invalid game, image must be a valid URL");

  if (!released_date)
    throw new ClientError("Invalid game, the released date is required");
  const date = new Date(released_date);
  const parsedDate = date.toISOString().slice(0, 10);
  const limit = new Date(limitDate);
  if (isNaN(date.getTime()) || parsedDate !== released_date || date > limit)
    throw new ClientError(
      `Invalid game, released date isn't valid - ${released_date} - ${parsedDate}`
    );

  if (isNaN(rating))
    throw new ClientError("Invalid game, the rating must be a number");
  if (rating > 100 || rating < 0)
    throw new ClientError("Invalid game, the rating must be between 0 and 100");
  const ratingString = rating.toString();
  if (ratingString.includes(",") || ratingString.includes("."))
    throw new ClientError("Invalid game, the rating must be a integer");

  next();
};

module.exports = validateGame;
