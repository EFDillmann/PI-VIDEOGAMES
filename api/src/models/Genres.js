const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("genres", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 40],
      },
    },
  });
};
