const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Bay", {
    bay_number: {
      type: DataTypes.STRING,
    },
    bay_type: {
      type: DataTypes.STRING,
    },
    vehicle_number: {
      type: DataTypes.STRING,
    },
  });
};
