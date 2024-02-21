const parking_util = require("../util/parking-util");
const parking_lot_util = require("../util/parking-lot-util");

module.exports = {
  entry: async (req, res) => {
    const vehicle_number = req.body.vehicle_number;
    const empty_slot = await parking_util.find_empty_slot(req.body.id, req.body.size);
    if (empty_slot != undefined) {
      const slot_id = await parking_util.reserve_slot_generate_ticket(empty_slot, vehicle_number);
      res.send({ slot_id: slot_id });
      return;
    }
    res.send("no space available");
  },

  exit: async (req, res) => {
    const released_slot = await parking_util.release_slot(req.body.ticket);
    res.send({ released: released_slot });
  },

  create: async (req, res) => {
    parking_lot_util.create(req.body);
    res.send("got a request on create");
  },

  delete: async (req, res) => {
    parking_lot_util.delete(req.body.id);
    res.send("got a request on delete");
  },
};
