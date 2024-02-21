const db = require("../models");

module.exports = {
  find_empty_slot: async (parking_lot_id, size) => {
    let empty_slot;
    let size_index = 0;
    let sizes = ["s", "m", "l", "xl"];
    for (const this_size of sizes) {
      if (this_size == size) break;
      size_index++;
    }

    const floors = await db.Floor.findAll({
      where: {
        ParkingLotId: parking_lot_id,
      },
    });

    while (size_index < sizes.length && empty_slot == undefined) {
      // find empty slot and reserve
      for (const floor of floors) {
        empty_slot = await db.Bay.findOne({
          where: { FloorId: floor.id, bay_type: sizes[size_index], vehicle_number: null },
        });

        if (empty_slot != undefined) break;
      }
      size_index++;
    }

    return empty_slot;
  },

  reserve_slot_generate_ticket: async (bay, vehicle_number) => {
    bay.vehicle_number = vehicle_number;
    await bay.save();
    return bay.id;
  },

  release_slot: async (ticket) => {
    return await db.Bay.update(
      { vehicle_number: null },
      {
        where: {
          id: ticket,
        },
      }
    );
  },
};
