const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Floor",
    {
      floor_number: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
