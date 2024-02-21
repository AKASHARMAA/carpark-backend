const db = require("../models");

async function loadData() {
  for (let lot = 1; lot <= 120; lot++) {
    const parkinglot = await db.ParkingLot.create({});

    for (let floor = 1; floor <= 3; floor++) {
      console.log("lot ", lot, " floor ", floor);
      const parking_floor = await db.Floor.create({
        floor_number: floor,
      });

      for (let bay = 1; bay <= 100; bay++) {
        const small_bay = await db.Bay.create({
          bay_number: bay,
          bay_type: "s",
        });

        const medium_bay = await db.Bay.create({
          bay_number: bay,
          bay_type: "m",
        });

        const large_bay = await db.Bay.create({
          bay_number: bay,
          bay_type: "l",
        });

        const xl_bay = await db.Bay.create({
          bay_number: bay,
          bay_type: "xl",
        });

        await parking_floor.addBays([small_bay, medium_bay, large_bay, xl_bay]);
      }
      await parkinglot.addFloor(parking_floor);
    }
  }
}

// loadData();
