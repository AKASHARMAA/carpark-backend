const db = require("../models");

module.exports = {
  create: async (parking_lot_params) => {
    const parking_lot = await db.ParkingLot.create({});

    for (let floor = 1; floor <= parking_lot_params.floors; floor++) {
      const parking_floor = await db.Floor.create({
        floor_number: floor,
      });

      let bay_sizes = ["small_bays", "medium_bays", "large_bays", "xl_bays"];
      for (const bay_size of bay_sizes) {
        for (let bay = 1; bay <= parking_lot_params[bay_size]; bay++) {
          const small_bay = await db.Bay.create({
            bay_number: bay,
            bay_type: "s",
          });
          await parking_floor.addBay(small_bay);
        }
      }
      await parking_lot.addFloor(parking_floor);
    }
  },

  delete: async (lot_id) => {
    return await db.ParkingLot.destroy({
      where: {
        id: lot_id,
      },
    });
  },
};
