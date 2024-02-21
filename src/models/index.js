const { Sequelize } = require("sequelize");

const db_config = require("../config/database");

const sequelize = new Sequelize(db_config.DB_NAME, db_config.USERNAME, db_config.PASSWORD, {
  host: db_config.HOST,
  dialect: db_config.DIALECT,
  logging: false,
});

const db = {};
db.sequelize = sequelize;
db.ParkingLot = require("./parking-lot.model")(sequelize);
db.Floor = require("./floor.model")(sequelize);
db.Bay = require("./bay.model")(sequelize);

// associations
db.ParkingLot.hasMany(db.Floor, { onDelete: "CASCADE" });
db.Floor.belongsTo(db.ParkingLot);
db.Floor.hasMany(db.Bay, { onDelete: "CASCADE" });
db.Bay.belongsTo(db.Floor);

// TODO: need to remove this line when I ship out the code.
sequelize.sync({ alter: true });

module.exports = db;
